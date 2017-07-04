const express = require('express');
const router = express.Router();
const tumblr = require('tumblr.js');
const Post = require('../db/post');

const client = tumblr.createClient({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  token: process.env.token,
  token_secret: process.env.token_secret
});

router.get('/tumblr', (req, res) => {
  client.blogPosts(process.env.blog, {type: 'photo'}, function(err, resp) {
    res.send(resp.posts);
  });
})

router.get('/posts', (req, res) => {
  Post.find({}, function(err, obj) {
  if(err)console.log(err);
  res.send(obj);
  })
})

router.get('/isloggedin', (req, res) => {
  if(req.user) {
    res.send('yes')
  } else{
    res.send('no')
  }
})

module.exports = router;
