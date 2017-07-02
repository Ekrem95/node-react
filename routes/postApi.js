const express = require('express');
const router = express.Router();
const Post = require('../db/post');

router.get('/', (req, res) => {
  Post.find({}, function(err, obj) {
  if(err)console.log(err);
  res.send(obj);
})
})

module.exports = router;
