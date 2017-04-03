'use strict';

let stripeClient = require('../stripeClient.js');

module.exports = function(req, res) {
  var token = req.body.id;
  var organizer = req.body.card.name;

  var charge = stripeClient.stripe.charges.create({
    amount: 500,
    currency: "usd",
    description: "test payment",
    source: token,
    destination: stripeClient.acct_ids[organizer]
  }, function(err, charge) {
    // asynchronously called
  });
  res.end();
}
