const router = require('express').Router();
const stripe = require('stripe')('sk_test_51NXgzkGNThYXIbcn0F6aZpnthhJGrpCwWJ9zBoEx4tciJdgeqHbeAShEflBV586w2T8DZb9XxxTGSfBtXOWdt1WB00FBzaq8J9');

const PORT = process.env.PORT || 3001;

router.post('/checkout', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1NY1xIGNThYXIbcnxPscPPKY',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000?success=true`,
      cancel_url: 'http://localhost:3000?canceled=true',
    });
  
    res.redirect(303, session.url);
});

module.exports = router;
