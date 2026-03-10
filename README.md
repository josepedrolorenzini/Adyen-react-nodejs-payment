# Adyen Payment Integration System

This project is a payment integration demonstration using the Adyen platform. It consists of a backend server in Node.js (Express) and a frontend application (React + Vite).

## Project Structure

- **backend/**: API server that handles secure communication with Adyen.
- **frontend/adyenFront/**: Client application built with React and Vite.

## Prerequisites

- Node.js installed.
- An Adyen test account (you will need your API Key and Merchant Account).

## Setup

### 1. Backend

The backend runs on port `4000` and exposes the necessary endpoints to process payments.

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` folder and configure your credentials:
    ```env
    ADYEN_API_KEY=your_api_key_here
    ADYEN_MERCHANT_ACCOUNT=your_merchant_account_here
    ```
4.  Start the server:
    ```bash
    node server.js
    ```

### 2. Frontend

The frontend interacts with the backend to initiate the payment flow.

1.  Navigate to the frontend directory:
    ```bash
    cd frontend/adyenFront
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the application:
    ```bash
    npm run dev
    ```
    By default, the application will run at `http://localhost:5173`.

## API Endpoints

- `GET /api/hello`: Checks the server status and credentials.
- `POST /api/payment`: Processes a payment request by sending data to Adyen.

# curl commands -->

curl https://checkout-test.adyen.com/v71/payments \
-H "x-API-key: your-api-key" \
-H "content-type: application/json" \
-d '{
"amount": {"currency": "AUD", "value": 1000},
"reference": "TEST_CURL_PAYMENT",
"merchantAccount": "Your-Ayden-Merchant-ECOM",
"paymentMethod": {"type": "scheme", "number": "test_4111111111111111", "expiryMonth": "test_03", "expiryYear": "test_2030", "cvc": "test_737"},
"returnUrl": "http://localhost:4000"
}'

# checking adyen library methods

node -e "console.log(Object.keys(require('@adyen/api-library')))"
