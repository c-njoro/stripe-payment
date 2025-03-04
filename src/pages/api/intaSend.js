const IntaSend = require("intasend-node");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    let intasend = new IntaSend(
      process.env.NEXT_PUBLIC_INSTA_PUBLISHABLE_KEY,
      process.env.INSTA_SECRET_API,
      true // Set to false in production
    );

    let collection = intasend.collection();
    const response = await collection.charge({
      first_name: "Joe",
      last_name: "Doe",
      email: "joe@doe.com",
      host: "http://localhost:3000",
      amount: 10,
      currency: "KES",
      api_ref: "test",
      redirect_url: "http://localhost:3000/thank-you",
    });

    // Send the checkout URL to the frontend
    console.log("Checkout URL:", response.url);
    res.status(200).json({ checkout_url: response.url });
  } catch (error) {
    console.error("Charge error:", error);
    res.status(500).json({ message: "Payment failed", error: error.message });
  }
}
