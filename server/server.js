'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let passport = require('./middleware/initPassport');
let path = require('path');
let handler = require('./routes/request_handler');

let port = process.env.PORT || 8080;
let app = express();
// var server = require('http').Server(app);
// let io = require('socket.io')(server);

// let trace = require('babel-plugin-trace');
// trace: 'JG using trace with var:', port;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session( {
  secret: 'I didn\'t get Inception',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', express.static(path.join(__dirname, '../src/client')));
app.use('/donate', express.static(path.join(__dirname, '../src/client/app/donate.html')));
app.use('/createStripeAccount', express.static(path.join(__dirname, '../src/client/app/createStripeAccount.html')));

app.get('/events', passport.authenticate('facebook-token'), handler.getEvents);

app.post('/confirmedUsers', passport.authenticate('facebook-token'), handler.confirmedUsers);

app.get('/users', handler.getUsers);

app.post('/events/users', passport.authenticate('facebook-token'), handler.addUsersEvents);

app.post('/events/create', passport.authenticate('facebook-token'), handler.createEvent);

app.post('/accept', passport.authenticate('facebook-token'), handler.acceptEvent);

app.post('/reject', passport.authenticate('facebook-token'), handler.rejectEvent);

app.post('/delete', passport.authenticate('facebook-token'), handler.deleteEvent);

app.post('/delete/owner', passport.authenticate('facebook-token'), handler.deleteOwnerEvent);

app.post('/checkStatus', passport.authenticate('facebook-token'), handler.checkStatus);

app.get('/test', passport.authenticate('facebook-token'), function(req, res) {
  if (req.user) {
    res.status(200).json(
      { message: 'success',
        user: req.user
      });
  } else {
    res.status(404).send('login failed');
  }
});

app.post('/sms/remind', handler.sendSms);

app.get('*', handler.wildCard);


// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
let stripe = require("stripe")("sk_test_OK8yxHtRa4gbHYxACgjDireW");

// ---------- organizer route ----------

var acct_ids = {};

app.post('/createManagedAccount', function(req, res) {
  var organizer = req.body;

  var account = stripe.accounts.create({
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
    acct_ids[account.legal_entity.first_name] = account.id;
  });
  res.end();
});

app.get('/payments', function(req, res) {
  var transactions = stripe.balance.listTransactions({
    stripe_account: acct_ids["David"],
  }, function(err, transactions) {
    // asynchronously called
  });
  res.end();
});

// ---------- attendee route ----------

app.post('/checkout', function(req, res) {
  var token = req.body.id;
  var organizer = req.body.card.name;

  var charge = stripe.charges.create({
    amount: 500,
    currency: "usd",
    description: "test payment",
    source: token,
    destination: acct_ids[organizer]
  }, function(err, charge) {
    // asynchronously called
  });
  res.end();
})

// io.on('connection', function (socket) {
//   console.log('inside connectionYEAHBUDDY');
//   socket.on('chat', function(msg) {
//     console.log('message from client:', msg)
//     //on incoming message log message in db and return updated message list
//     handler.saveMessage(msg)
//       .then( () => {
//         console.log('inside then promise', msg);
//         return handler.getMessages(msg.event_id)
//       }).
//       then((messages) => {
//         // return handler.getMessages(msg)
//         console.log('messageSERVER', messages)
//         io.emit('messages', messages);
//       })
//       .catch( (error) => {
//         console.error(error);
//       })
//     });
//   socket.on('disconnect', function (data) {
//     console.log('userDisconnected', data)
//   })
// })

// server.listen(port, function(){
//   console.log('we are now listening on: who cares!!!', port);
// })


app.listen(port, function() {
  console.log('we are now listening on: ' + port);
});
