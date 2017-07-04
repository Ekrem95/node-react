const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('../db/user');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.post('/', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) console.log(err);
    if (!user) {
      res.send({ error: 'No user' });
    }else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        req.session.user = user;
        //console.log(user);
        res.redirect('/dashboard');
      }else {
        res.redirect('login');
      }
    }
  });
});

module.exports = router;
