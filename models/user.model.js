const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// modelo de la coleccion user

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { versionKey: false });

const User = mongoose.model('User', userSchema);
module.exports = User;
