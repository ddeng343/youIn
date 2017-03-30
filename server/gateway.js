var braintree = require('braintree');

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "6sxb6wcj89jmz5f9",
  publicKey: "44m2r78j8qp3sdmk",
  privateKey: "87ef79fb2197dda1d6c1365a80d261ef"
});

module.exports = gateway;

// 'use strict';

// var braintree = require('braintree');
// var environment, gateway;

// require('dotenv').load();

// environment = process.env.BT_ENVIRONMENT.charAt(0).toUpperCase() + process.env.BT_ENVIRONMENT.slice(1);

// gateway = braintree.connect({
//   environment: braintree.Environment[environment],
//   merchantId: process.env.BT_MERCHANT_ID,
//   publicKey: process.env.BT_PUBLIC_KEY,
//   privateKey: process.env.BT_PRIVATE_KEY
// });

// module.exports = gateway;