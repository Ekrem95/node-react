const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://localhost/react');

const File = mongoose.model('File', new Schema({
  id: ObjectId,
  name: String,
  addr: String,
}));

module.exports = File;
