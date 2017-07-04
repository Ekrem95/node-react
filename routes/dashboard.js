const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', requireLogin, (req, res) => {
  console.log(req.user);
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

function requireLogin(req, res, next) {
  if (!req.user) {
    res.redirect('/login');
  }else {
    next();
  }
}

module.exports = router;
