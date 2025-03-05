import IntaSend from "intasend-node";

export default async function handler(req, res) {
  const { amount } = req.body;
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (!amount) {
    return res.status(400).json({ message: "Amount is required" });
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
      host: `${process.env.FRONTEND_URL}`,
      amount: amount,
      currency: "KES",
      api_ref: "test",
      redirect_url: `${process.env.FRONTEND_URL}/thank-you`,
    });

    // Send the checkout URL to the frontend
    console.log("Checkout URL:", response.url);
    res.status(200).json({ checkout_url: response.url });
  } catch (error) {
    console.error("Charge error:", error);
    res.status(500).json({ message: "Payment failed", error: error.message });
  }
}
