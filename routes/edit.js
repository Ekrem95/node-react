const express = require('express');
const router = express.Router();
const path = require("path");
const Post = require('../db/post');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.post('/', (req, res) => {
  const id = req.headers.referer.split("/").pop();
  Post.update({
  '_id': id
}, {
  $set:{
    "title": req.body.title,
    "desc": req.body.desc,
  }},
{upsert:false}, function(err, doc){
    if (err) console.log(err);
});
  res.redirect('/dashboard')
});

// router.get('/:id', (req, res) => {
//   res.send(req.params.id);
// });

router.get('/api/:id', (req, res) => {
  Post.findById(req.params.id, function(err, p) {
   if (!p)
     return (new Error('Could not load Document'));
   else {
     res.send(p);
   }
 });
});

module.exports = router;
