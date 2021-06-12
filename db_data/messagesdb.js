#! /usr/bin/env node

console.log('This script populates some messages to the database. Specified database as argument - populatedb mongodb+srv://userDb:1234@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var async = require('async')
var Message = require('../models/message')
const { DateTime } = require('luxon');


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

Message.create([{
  to_id: '60ae8e75c0c7463856408549',
  subject: 'Inquiry Ref #1234 - Jane Barn - July 1, 2021',
  name: 'Jane Barn',
  email: 'a@a.com',
  library_card: '12345678',
  message: 'hello this is test',
  read: false,
  timestamp: Date.now()
}])
.then(message => {
  console.log(`${message.length} messages created`);
})
.catch((err) => {
  console.log(err);
})
.finally(() => {
  mongoose.connection.close();
});


// User.create([{
//   username: 'dan123',
//   email: 'dan@dan.com',
//   postcode: 'SE270JF',
//   password: '123'
// }, {
//   username: 'ben123',
//   email: 'ben@ben.com',
//   postcode: 'SE191SB',
//   password: '123'
// }])
// .then(user => {
//   console.log(`${user.length} users created`);
// })
// .catch((err) => {
//   console.log(err);
// })
// .finally(() => {
//   mongoose.connection.close();
// });



