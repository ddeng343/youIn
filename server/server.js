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
var server = require('http').Server(app);
let io = require('socket.io')(server);
// console.log(io)

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

app.post('/createManagedAccount', handler.createManagedAccount);

app.get('/payments', handler.payments);

app.post('/checkout', handler.checkout);

app.get('*', handler.wildCard);

//STARTING SOCKET CONNECTION
io.on('connection', function (socket) {

  socket.on('chat', function(msg) {

    //SAVING AND RETREIVING MESSAGES
    handler.saveMessage(msg)
      .then( () => {
        return handler.getMessages(msg.event_id)
      }).
      then((messages) => {
        if(messages.length > 10){
          messages = messages.slice(messages.length-10, messages.length);
        }
        io.emit('messages', messages);
      })
      .catch( (error) => {
        console.error(error);
      })
    });

  //GETTING ALL MESSAGES
  socket.on('getMessages', function (event_id) {
    handler.getMessages(event_id)
  .then( (messages) => {
      if(messages.length > 10) {
        messages = messages.slice(messages.length-10, messages.length);
      }
      io.emit('messages', messages);
    })
    .catch( (error) => {
      console.error(error)
    })
  })

  //SOCKET DISCONNECT
  socket.on('disconnect', function (data) {
    console.log('userDisconnected', data)
  })
})

server.listen(port, function(){
  console.log('we are now listening on: who cares!!!', port);
})

// app.listen(port, function() {
//   console.log('we are now listening on: ' + port);
// });
