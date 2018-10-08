const mongoose = require('mongoose');

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

module.exports = Post;
