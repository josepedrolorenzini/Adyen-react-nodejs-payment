const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs/promises");
const { Client, CheckoutAPI, SessionsApi } = require("@adyen/api-library");
require("dotenv").config();

// const __filename = fileURLToPath(import.meta.url); // only type:module

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

// Use __dirname safely in CommonJS
const publicDir = path.join(__dirname, "public");

// CWD current working directory
const publicDirCwd = path.join(process.cwd(), "public"); //  Tip senior

/* Verificar que las variables de entorno existan // var in .env file */
if (!process.env.ADYEN_API_KEY || !process.env.ADYEN_MERCHANT_ACCOUNT) {
  console.error(
    "❌ ADYEN_API_KEY o ADYEN_MERCHANT_ACCOUNT no están definidos en .env",
  );
  process.exit(1);
}

/* Adyen client instance*/
const client = new Client({
  apiKey: process.env.ADYEN_API_KEY,
  environment: "TEST", /// setting test environment / ambiente de test
});

// payment adyen
// client
const checkout = new CheckoutAPI(client);

// session
//const sessionsApi = new SessionsApi(client);
/* Adyen client */

// serve static files
app.use(express.static(publicDir));

/* Rutas */
app.get("/", async (req, res) => {
  console.log(process.env.ADYEN_API_KEY);
  console.log(publicDirCwd);
  res.writeHead(200, { "Content-Type": "text/html" });
  res.send("Hello World!");
});

// Ayden routes
app.get("/api/check-adyen", async (req, res) => {
  try {
    const session = await checkout.PaymentsApi.sessions({
      merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
      amount: { currency: "AUD", value: 1000 },
      reference: `lorenzini-test-${Date.now()}`,
      channel: "Web",
      returnUrl: "http://localhost:5173", // my react app
      countryCode: "AU",
    });

    console.log("✅ Session created successfully:", session.id);

    res.json({
      status: "OK",
      message: "Connected to Adyen 🚀",
      sessionId: session.id,
      sessionData: session.sessionData,
    });
  } catch (error) {
    console.error(
      "Adyen Connection Error:",
      error.responseBody || error.message,
    );

    res.status(error.statusCode || 500).json({
      status: "FAILED ",
      message: "Could not connect to Adyen",
      error: error.responseBody?.message || error.message,
    });
  }
}); // checking connection to adyen

/* Payment endpoint */
app.post("/api/payment", async (req, res) => {
  console.log("Incoming body:", req.body);

  if (!req.body?.amount?.value) {
    return res.status(400).json({ error: "Missing payment amount" });
  }

  //Destructuring body values
  const { currency, value } = req.body.amount;

  try {
    const paymentRequest = {
      merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
      amount: {
        currency: currency || "AUD",
        value: value || 1000,
      },
      reference: `lorenzini-vientodelsur-${Date.now()}`,
      paymentMethod: {
        type: "scheme",
        encryptedCardNumber: "test_4111111111111111", // all of them need the word test_xxx
        encryptedExpiryMonth: "test_03",
        encryptedExpiryYear: "test_2030",
        encryptedSecurityCode: "test_737",
      },
      channel: "Web",
      returnUrl: "http://localhost:5173", // my react app
    };

    // const response = await checkout.payments.request(paymentRequest);
    const response = await checkout.PaymentsApi.payments(paymentRequest);

    // Check the result code before telling the user it's 'done'
    const { resultCode, pspReference } = response;

    console.log("✅ Adyen response:", response);
    if (resultCode === "Authorised") {
      console.log("💰 Payment Authorised:", pspReference);
      res.json(response);
    } else {
      console.warn("⚠️ Payment Not Authorised:", resultCode);
      res.status(400).json(response); // Send back Refused, Cancelled, etc.
    }
    // res.json(response);
  } catch (error) {
    console.error("❌ Adyen error:", error.responseBody || error);
    //console.error("❌ Adyen error:", JSON.stringify(error.responseBody || error, null, 2));

    // Manejo de errores de Adyen
    if (error.responseBody) {
      return res.status(error.statusCode || 500).json({
        error: error.responseBody.message || "Payment failed",
        errorCode: error.responseBody.errorCode || "UNKNOWN",
      });
    }

    res.status(500).json({ error: "Payment failed" });
  }
});

// Ayden routes

/* Iniciar servidor */
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
