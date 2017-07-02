const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

mongoose.connect("mongodb://localhost/react");

const Post = mongoose.model("Post", new Schema({
   id: ObjectId,
   title: String,
   desc: String,
   src: String,
   comments: Array
}));

module.exports = Post;
