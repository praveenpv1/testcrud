const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  
  name: {
      type: String,
      required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  status: {
    type: Boolean,
    default: true
  },
  created_at: {
      type: Date,
      required: true,
      default: Date.now
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model('Users', UserSchema);