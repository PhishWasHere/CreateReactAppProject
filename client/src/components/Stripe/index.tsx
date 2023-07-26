import React, { useState, useEffect} from "react";

const ProductDisplay = () => (
  <section>
    <form action="/api/checkout" method="POST">
      <button type="submit" className="btn-primary rounded-lg p-2 transition">
          Donate
      </button>
    </form>
  </section>
);

const Message = ({ message }: any) => (
<section>
    <p className="break-all">{message}</p>
</section>
);

export default function Stripe () {
    const [message, setMessage] = useState("");

    useEffect(() => {
      // Check to see if this is a redirect back from Checkout
      const query = new URLSearchParams(window.location.search);
  
      if (query.get("success")) {
        setMessage("Thank you for donating to my alcohol fund.");
      }
  
      if (query.get("canceled")) {
        setMessage(
          "Order canceled -- feel free to continue using the site."
        );
      }
    }, []);
  
    return (
      <>
        <ProductDisplay />
        {message ? (
          <Message message={message} />
        ) : null }
      </>
    );
  }