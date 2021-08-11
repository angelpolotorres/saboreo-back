const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  accountVerificated: { type: Boolean, default: false, required: true },
  codeVerificationAccount: { type: String, required: true },
  creationDate: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model('User', UserSchema);
