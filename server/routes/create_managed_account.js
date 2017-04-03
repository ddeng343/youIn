'use strict';

let stripeClient = require('../stripeClient.js');

module.exports = function(req, res) {
  var organizer = req.body;

  var account = stripeClient.stripe.accounts.create({
    managed: true,
    country: 'US',
    external_account: {
      object: "bank_account",
      country: "US",
      currency: "usd",
      routing_number: "110000000",
      account_number: "000123456789",
    },
    tos_acceptance: {
      date: 1491016016,
      ip: "199.87.82.66"
    },
    legal_entity: {
      dob: {
        day: 10,
        month: 1,
        year: 1986
      },
      first_name: organizer.name,
      last_name: "Deng",
      type: "individual",
      address: {
        line1: "1234 Main Street",
        postal_code: 94111,
        city: "San Francisco",
        state: "CA"
      },
      personal_id_number: "000000000",
    }
  }, function(err, account) {
    stripeClient.acct_ids[account.legal_entity.first_name] = account.id;
  });
  res.end();
}
