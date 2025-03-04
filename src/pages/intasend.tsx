const IntaSendPage = () => {
  const handleCheckout = async () => {
    try {
      console.log("clicked");
      const response = await fetch("/api/intaSend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      console.log(data);

      if (response.ok && data) {
        window.location.href = data.checkout_url; // Redirect user to payment page
      } else {
        alert("Payment failed: " + data.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center item-center bg-black text-white">
      <h1 className="text-xl font-bold my-5">Request pay</h1>
      <button
        className="bg-blue-600 py-3 px-10 rounded-full"
        onClick={handleCheckout}
      >
        Pay Now
      </button>
    </div>
  );
};

export default IntaSendPage;
