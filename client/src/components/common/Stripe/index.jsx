import React, { useState, useEffect} from "react";

const ProductDisplay = () => (
  <>
  </>
);

const Message = ({ message }) => (
<section>
    <p className="break">{message}</p>
</section>
);


export default function Stripe () {
  const [message, setMessage] = useState("");
  const [showComponent, setShowComponent] = useState(true);

  const handleClick = () => {
    setShowComponent((prevShowComponent) => !prevShowComponent);
  }
  
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
        <>
          <section className={showComponent ? "flex items-center p-4 mb-4 border-t-4 border-primary bg-base-100 rounded-lg" : 'hidden'}>
            <div className="ml-3 text-sm font-medium">
              <Message message={message} />
            </div>
              <button onClick={() => handleClick()} type="button" className="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 btn-primary inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#alert-border-1" aria-label="Close">
                <span className="sr-only">Dismiss</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
              </button>
          </section>
        </>
      ) : null }
    </>
  );
}
