const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('../db/user');
const Post = require('../db/post');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.post('/', (req, res) => {
  console.log(req);
  res.redirect('/');
});

module.exports = router;
