const mongoose = require('mongoose');
const Post = require('./post');
const User = require('./user');

mongoose.set('useCreateIndex', true);
mongoose.connect(
    process.env.MONGO_URL || 'mongodb://root:pass@localhost:27017/dev?authSource=admin',
    { useNewUrlParser: true }
);

module.exports = { Post, User };
