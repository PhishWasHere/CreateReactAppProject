const router = require('express').Router();

const SK = process.env.STRIPE_SK_TEST;

const stripe = require('stripe')(SK);
 
router.post('/checkout', async (req, res) => {
  
  const YOUR_DOMAIN = `http://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      submit_type: 'donate',
      line_items: [
        {
          price: process.env.STRIPE_PRICE, //price id from stripe set on stripe dashboard
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
  
    res.redirect(303, session.url);
});

module.exports = router;
