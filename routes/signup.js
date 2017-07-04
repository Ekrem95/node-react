const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('../db/user');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.post('/', (req, res) => {
  var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  var user = new User({
    email: req.body.email,
    password: hash,
  });
  console.log(user);
  user.save(err => {
    if (err) {
      if (err.code === 11000) {
        var error = 'That email is already taken';
      }

      res.send({ error: err });
    }else {
      req.session.user = user;
      console.log(user);
      res.redirect('/dashboard');
    }
  });
});

module.exports = router;
