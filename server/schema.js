const pgp = require('pg-promise')();
//const mysql = require('mysql');
//const Promise = require('bluebird');

module.exports = (db) => {

  // if (!db.queryAsync) {
  //   db = Promise.promisifyAll(db);
  // }

  return db.query('CREATE type status AS ENUM(\'pending\', \'accepted\', \'rejected\');')
  .catch( (err) => {
    if (err.code !== '42710') {
      throw err;
    }
  })
  .then( () => {
    return db.query('CREATE TABLE IF NOT EXISTS events (\
      event_id SERIAL not null PRIMARY KEY,\
      owner BIGINT NOT NULL,\
      title varChar(50),\
      short_desc varChar(50),\
      description varChar(255),\
      location varChar(255),\
      date DATE,\
      time TIME,\
      min INT);');
  })
  .then(() => {
    return db.query('CREATE TABLE IF NOT EXISTS users (\
      user_id BIGINT not null PRIMARY KEY,\
      token varChar(200),\
      firstname varChar(50),\
      lastname varChar(50),\
      photoUrl varChar(150),\
      email varChar(50),\
      account_id varChar(50),\
      phoneNumber varChar(20));');
  })
  .then(() => {

    return db.query('CREATE TABLE IF NOT EXISTS users_events (\
      event_id int not null,\
      user_id BIGINT not null,\
      current_status status default \'pending\');');
  })
  .then(() => {
    return db.query('CREATE TABLE IF NOT EXISTS friends (\
      user1 BIGINT not null,\
      user2 BIGINT not null);');
  });
};
