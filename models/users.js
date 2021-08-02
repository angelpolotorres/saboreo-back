const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  accountVerificated: { type: Boolean, default: false, required: true },
  codeVerificationAccount: { type: String, required: true },
});

module.export = mongoose.model('User', UserSchema);
