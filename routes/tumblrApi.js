const express = require('express');
const router = express.Router();
const tumblr = require('tumblr.js');

const client = tumblr.createClient({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  token: process.env.token,
  token_secret: process.env.token_secret
});

router.get('/', (req, res) => {
  client.blogPosts(process.env.blog, {type: 'photo'}, function(err, resp) {
    res.send(resp.posts);
  });
})

module.exports = router;
