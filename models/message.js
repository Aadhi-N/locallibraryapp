const { DateTime } = require('luxon');

const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

const MessageSchema = new Schema (
  {
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

MessageSchema
.virtual('date_formatted')
.get(function() {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_MED)
})

MessageSchema
.virtual('url')
.get(function() {
  return '/user/message/' + this._id;
});

MessageSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Message', MessageSchema);





