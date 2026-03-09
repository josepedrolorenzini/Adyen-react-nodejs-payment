const express = require("express");
const cors = require("cors");
const { Client, CheckoutAPI } = require("@adyen/api-library");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 4000;

/* Adyen client */
const client = new Client({
  apiKey: process.env.ADYEN_API_KEY,
  environment: "TEST",
});

const checkout = new CheckoutAPI(client);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/hello", (req, res) => {
  console.log(process.env.ADYEN_API_KEY);
  res.json({ message: "Backend working 🚀" });
});

/* payment endpoint */
app.post("/api/payment", async (req, res) => {
  console.log("Incoming body:", req.body);
  try {
    if (!req.body?.amount?.value) {
      return res.status(400).json({ error: "Missing payment amount" });
    }
    const response = await checkout.PaymentsApi.payments({
      amount: {
        currency: "AUD",
        value: req.body.amount.value,
      },

      reference: "demo-payment",

      merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,

      paymentMethod: {
        type: "scheme",
        number: "4111111111111111",
        expiryMonth: "03",
        expiryYear: "2030",
        cvc: "737",
      },

      channel: "Web",
      returnUrl: "http://localhost:5173",
    });

    res.json(response);
  } catch (error) {
    console.error("Adyen error:", error.responseBody || error);
    res.status(500).json({ error: "payment failed" });
  }

  /*
  console.log(req.body);
  console.log(req.params);
  console.log(req.body.amount.currency);
  console.log(typeof req.body.amount.value);

  const currency = req.body.amount.currency;
  const amount = req.body.amount.value;
  console.log(
    "Usando Key:",
    process.env.ADYEN_API_KEY.substring(0, 10) + "...",
  );
  console.log("Usando Merchant:", process.env.ADYEN_MERCHANT_ACCOUNT);
  try {
    const response = await checkout.PaymentsApi.payments({
      amount: {
        currency: "AUD",
        value: amount,
      },
      reference: "demo-payment",
      merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
      returnUrl: "http://localhost:5173",
      channel: "Web",
    });

    res.json({
      message: "Backend payment endpoint working ",
      currency: currency,
      amount: amount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "payment failed" });
    }
    */
}); // payment Endpoint

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
