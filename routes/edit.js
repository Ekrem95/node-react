const express = require('express');
const router = express.Router();
const path = require('path');
const Post = require('../db/post');
const User = require('../db/user');

router.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.post('/', (req, res) => {
  const id = req.headers.referer.split('/').pop();
  Post.update({
    _id: id,
  }, {
    $set: {
      title: req.body.title,
      desc: req.body.desc,
    }, },
{ upsert: false }, function (err, doc) {
    if (err) console.log(err);
  });

  res.redirect('/dashboard');
});

// router.get('/:id', (req, res) => {
//   res.send(req.params.id);
// });

module.exports = router;
