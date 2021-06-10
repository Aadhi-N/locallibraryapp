#! /usr/bin/env node

console.log('This script populates some users to the database. Specified database as argument - populatedb mongodb+srv://userDb:1234@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var async = require('async')
var User = require('../models/user')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = [];

function userCreate(username, password, cb) {
    var user = new User({ username: username, password: password});

    user.save(function(err) {
        if(err) {
            cb(err, null);
            return;
        }
        console.log('New User: ' + user);
        users.push(user);
        cb(null, user);
    })
};

function createUsers(cb) {
    async.series([
        function(callback) {
            userCreate('12345678', 'password123', callback);
        },
        function(callback) {
            userCreate('87654321', 'password123', callback);
        }
    ])
};

async.series([
    createUsers
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('USERS: '+users);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



