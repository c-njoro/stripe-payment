import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PaymentSuccess = () => {
  const router = useRouter();
  const { payment_intent, redirect_status } = router.query;
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (redirect_status === "succeeded") {
      setMessage("Payment successful! Thank you for your purchase.");
    } else {
      setMessage("There was an issue with your payment.");
    }
  }, [redirect_status]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-green-600 w-full text-center">
        {message}
      </h1>
      <p className="mt-2 text-gray-700">
        Payment Intent ID: <strong>{payment_intent}</strong>
      </p>
      <button
        onClick={() => router.push("/")}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
      >
        Go Home
      </button>
    </div>
  );
};

export default PaymentSuccess;
