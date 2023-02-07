const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51Lmp7kA1xmnDGI8RrhR9MAhlNf3ulzTnOLGStJ6TeDhPDUs1qqTL4h8J79VWPrmTRabkgj2L0cxxnTNG5h0TEg1t00iT1os75i"
);
// The following is required to set up an Api

// - App config
const app = express();

// - Middleware: Software that different applications use to communicate with each other
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment request recieved for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // basket total in subunits of the currency below. 
    currency: "usd",
  });

  // OK - Payment intent has been created.
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// Example API Endpoint - this is running on a cloud function
// http://localhost:5001/clone-41420/us-central1/api
