const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema (
  {
    username: {type: String, required: true, minLength: 8, maxLength: 8},
    password: {type: String, required: true, minLength: 8, maxLength: 12}
  }
);

UserSchema
.virtual('url')
.get(function() {
  return '/login/user/' + this._id;
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);