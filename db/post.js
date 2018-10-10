const mongoose = require('mongoose');
const Lib = require('./lib').default;

const Post = mongoose.model(
    'Post',
    new mongoose.Schema({
        id: mongoose.Schema.ObjectId,
        title: String,
        desc: String,
        src: String,
        comments: [],
    })
);

module.exports = new Lib(Post);
