const express = require('express');
const router = express.Router();
const tumblr = require('tumblr.js');
const Post = require('../db/post');
const User = require('../db/user');

const client = tumblr.createClient({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  token: process.env.token,
  token_secret: process.env.token_secret,
});

router.get('/tumblr', (req, res) => {
  client.blogPosts(process.env.blog, { type: 'photo' }, function (err, resp) {
    res.send(resp.posts);
  });
});

router.get('/posts', (req, res) => {
  Post.find({}, function (err, obj) {
    if (err)console.log(err);
    res.send(obj);
  }).sort({ _id: -1 });
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
