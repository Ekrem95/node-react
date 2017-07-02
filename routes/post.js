const express = require('express');
const router = express.Router();
const path = require("path");
const Post = require('../db/post');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.post('/', (req, res) => {
  var post = new Post({
   title: req.body.title,
   src: req.body.src,
   desc: req.body.desc
});
post.save(err => {
 if(err){
   console.log(err);
   res.redirect("/dashboard");
}else{
   //req.session.user = user;
   //console.log(poll);
   res.redirect("/dashboard");
}
});
});

module.exports = router;
