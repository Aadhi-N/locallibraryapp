const { DateTime } = require('luxon');

const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

const MessageSchema = new Schema (
  {
    from_id: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    to_id: {type: Schema.Types.ObjectId, ref: 'Admin', required: true},
    subject: {type: String},
    name: {type: String},
    email: {type: String},
    library_card: {type: String},
    message: {type: String},
    read: {type: Boolean},
    timestamp: {type: Date}
  }
);

// MessageSchema
// .virtual('url')
// .get(function() {
//   return '/login/user/' + this._id;
// });

MessageSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Message', MessageSchema);





