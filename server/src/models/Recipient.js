const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

module.exports = recipientSchema;
