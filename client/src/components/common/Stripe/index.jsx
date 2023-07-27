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

const Message = ({ message }) => (
<section>
    <p className="break">{message}</p>
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