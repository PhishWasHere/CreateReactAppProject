const router = require('express').Router();

const SK = process.env.STRIPE_SK_TEST;

const stripe = require('stripe')(SK);
 
const YOUR_DOMAIN = 'http://localhost:3000';

router.post('/checkout', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      submit_type: 'donate',
      line_items: [
        {
          price: 'price_1NY29eGNThYXIbcnsHjHceUV',
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
