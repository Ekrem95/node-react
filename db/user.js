const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://localhost/react');

const User = mongoose.model('User', new Schema({
  id: ObjectId,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
}));

module.exports = User;
