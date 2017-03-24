'use strict';

//const Promise = require('bluebird');
//const mysql = require('mysql');
const pgp = require('pg-promise')();
const makeSchema = require('./schema.js');
const database = 'youin';

// let connection = mysql.createConnection({
//     user: 'root',
//     password: ''

// });

//let db = Promise.promisifyAll(connection, {multiArgs: true});
console.log(process.env.DATABASE_URL);
let db = pgp({
  host: process.env.DATABASE_URL
});

// }

// db.connectAsync().then(() => {
//   console.log('You are connected to database' + database);
//   return db.queryAsync('CREATE DATABASE IF NOT EXISTS ' + database);
// }).then(() => {
//   return db.queryAsync('USE ' + database);
// }).then(() => {
//   return makeSchema(db);
// });
makeSchema(db);
module.exports = db;
