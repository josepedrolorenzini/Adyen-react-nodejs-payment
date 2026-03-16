const Database = require("better-sqlite3");
const db = new Database("adyenTeksystem.db", { verbose: console.log });

// Initialize Schema
const initDb = () => {
  const schema = `
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cardNumber TEXT NOT NULL,
      expiryMonth INTEGER NOT NULL DEFAULT 0,
      expiryYear INTEGER NOT NULL DEFAULT 0,
      cvc TEXT NOT NULL,
      amount INTEGER NOT NULL DEFAULT 0
    );
  `;
  db.exec(schema);
};

initDb();

module.exports = db;

/*
  columnas
   amount,
   cardNumber: formData.get("cardNumber"),
   expiryMonth: formData.get("expiryMonth"),
   expiryYear: formData.get("expiryYear"),
   cvc: formData.get("cvc"),

.run() — for INSERT, UPDATE, DELETE
.all() — for SELECT, returns array
.get() — for SELECT, returns one row

*/
