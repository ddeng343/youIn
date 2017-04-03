'use strict'

let bodyParser = require('body-parser');
let db = require('../config.js');

module.exports = function(req, res) {
  let event_id = req.body.event_id;

  db.query("select * from users_events where event_id = $1", [event_id])
  .then ( (confirmedUsers) => {
    res.status(200).json(confirmedUsers);
  })
  .catch( (err) => {
    res.status(404).send(err, 'Error in confirmed_users handler function');
  })
}

