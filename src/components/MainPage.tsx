import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import React, { useEffect, useState } from "react";

// Initialize Stripe outside of the component (replace with your publishable key)
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

// The form that collects payment details
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!stripe || !elements) {
      return;
    }

    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setAmountError("Please enter a valid amount");
      return;
    } else {
      setAmountError("");
    }

    setIsLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setMessage(submitError.message || "An unexpected error occurred");
      return;
    }

    try {
      // Fetch a new PaymentIntent for the entered amount
      const response = await fetch("/api/sendPayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parseFloat(amount) }),
      });

      // Log the response to see what it contains
      const responseText = await response.text();
      console.log("Response from server:", responseText);

      // Parse the response as JSON
      const data = JSON.parse(responseText);

      if (!response.ok) {
        throw new Error(data.message || "Failed to create payment intent");
      }

      // Confirm the payment using the returned clientSecret
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: data.clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
      });

      if (error) {
        setMessage(error.message || "An unexpected error occurred");
      }
    } catch (error) {
      setMessage("An error occured");
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="amount"
          className="block mb-2 font-medium text-gray-700"
        >
          Amount
        </label>
        <input
          type="text"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lightblue"
        />
        {amountError && (
          <p className="mt-1 text-sm text-red-600">{amountError}</p>
        )}
      </div>

      <PaymentElement />

      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full py-2 px-4 bg-lightblue hover:bg-blue-500 text-white font-medium rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
      {message && (
        <div className="p-4 rounded bg-red-100 text-red-700">{message}</div>
      )}
    </form>
  );
};

// Main component that loads Stripe Elements
const CardPaymentForm: React.FC = () => {
  const [clientSecret, setClientSecret] = useState<string>("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const createPaymentIntent = async (initialAmount: number) => {
      try {
        const response = await fetch("/api/sendPayment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: initialAmount }),
        });

        const data = await response.json();

        if (response.ok) {
          setClientSecret(data.clientSecret);
        } else {
          console.error("Failed to create payment intent:", data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Initialize with a minimum amount (you can modify this logic)
    createPaymentIntent(1);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-aliceblue">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-lightblue">
          Card Payment
        </h2>

        {clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        ) : (
          <div className="text-center py-4">Loading payment form...</div>
        )}
      </div>
    </div>
  );
};

export default CardPaymentForm;
