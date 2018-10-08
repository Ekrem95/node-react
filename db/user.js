const mongoose = require('mongoose');

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        id: mongoose.Schema.ObjectId,
        // username: { type: String, unique: true },
        email: { type: String, unique: true },
        password: String,
    })
);

module.exports = User;
