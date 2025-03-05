import Link from "next/link";

const ThankYou = () => {
  return (
    <div className="main-screen w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="heading font-bold text-4xl text-green-600">
        Thankyou, Payment confirmed
      </h1>
      <Link href="/" className="button">
        <p>Okay</p>
      </Link>
    </div>
  );
};

export default ThankYou;
