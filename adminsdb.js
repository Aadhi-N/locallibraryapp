#! /usr/bin/env node

console.log('This script populates some admin users to the database. Specified database as argument - populatedb mongodb+srv://userDb:1234@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var adminsArgs = process.argv.slice(2);

var async = require('async')
var Admin = require('./models/admin')

var mongoose = require('mongoose');
var mongoDB = adminsArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var admins = [];

function adminCreate(admin_username, admin_password, cb) {
    var admin = new Admin({ admin_username: admin_username, admin_password: admin_password });

    admin.save(function(err) {
        if(err) {
            cb(err, null);
            return;
        }
        console.log('New Admin: ' + admin);
        admins.push(admin);
        cb(null, admin);
    })
};

function createAdmins(cb) {
    async.series([
        function(callback) {
            adminCreate('admin124', 'password123', callback);
        },
        function(callback) {
            adminCreate('admin321', 'password123', callback);
        }
    ])
};

async.series([
    createAdmins
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('ADMINS: '+admins);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



