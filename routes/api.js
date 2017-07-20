const express = require('express');
const router = express.Router();
const Post = require('../db/post');
const User = require('../db/user');

router.get('/posts', (req, res) => {
  Post.find({}, function (err, obj) {
    if (err)console.log(err);
    res.send(obj);
  }).sort({ _id: -1 });
});

router.get('/posts/:skip', (req, res) => {
  Post.find({}, function (err, obj) {
    if (err)console.log(err);
    res.send(obj);
  }).sort({ _id: -1 })
    .limit(5)
    .skip(Number(req.params.skip) || 0);
});

router.get('/count/posts', (req, res) => {
  Post.count({}, function (err, num) {
    if (err)console.log(err);
    res.send(num + '');
  });
});

router.get('/isloggedin', (req, res) => {
  if (req.user) {
    res.send('yes');
  } else {
    res.send('no');
  }
});

router.get('/usr', (req, res) => {
  if (!req.user) {
    res.redirect('/login');
  } else {
    User.findById(req.user._id, function (err, u) {
      if (!u)
        return (new Error('Could not load Document'));
      else {
        res.send(u);
      }
    });
  }
});

router.get('/:id', (req, res) => {
  Post.findById(req.params.id, function (err, p) {
    if (!p)
      return (new Error('Could not load Document'));
    else {
      res.send(p);
    }
  });
});

module.exports = router;
