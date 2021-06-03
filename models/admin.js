const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

const AdminSchema = new Schema (
  {
    admin_username: {type: String, required: true, minLength: 8, maxLength: 8}
  }
);

AdminSchema
.virtual('url')
.get(function() {
  return '/login/admin/' + this._id;
});

AdminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Admin', AdminSchema);