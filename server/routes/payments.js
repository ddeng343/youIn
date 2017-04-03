'use strict';

let stripeClient = require('../stripeClient.js');

module.exports = function(req, res) {
  var transactions = stripeClient.stripe.balance.listTransactions({
    stripe_account: stripeClient.acct_ids["David"],
  }, function(err, transactions) {
    // asynchronously called
  });
  res.end();
}
