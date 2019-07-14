const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const requireLogin = require('../middlewares/requireLogin');

module.exports = function(app) {
  app.post('/api/stripe', requireLogin, async function(req, res) {
    await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });

    req.user.credits += 5; // eslint-disable-line
    var user = await req.user.save();

    res.send(user);
  });
};
