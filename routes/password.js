const express = require('express');
const router = express.Router();
const path = require("path");
const bcrypt = require('bcryptjs');
const User = require('../db/user');

router.get('/', (req, res) => {
  if(!req.user) {
    res.redirect('/login');
  }
  console.log(req.user);
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.post('/', (req, res) => {
  console.log(req.body);
  User.findOne({email: req.user.email},(err,user) => {
    if (err) console.log(err);
    if(!user){
       res.send({error: 'No user'})
    }else{
       if(bcrypt.compareSync(req.body.old, user.password) ){
          if(req.body.new === req.body.assert) {
            var hash = bcrypt.hashSync(req.body.new, bcrypt.genSaltSync(10));
            User.update({
              '_id': req.user._id
            }, {
              $set:{
                "password": hash
              }},
            {upsert:false}, function(err, doc){
                if (err) console.log(err);
            });
            res.redirect('/logout');
          }else {
            res.redirect('/changepassword');
          }
       }else{
          res.redirect("changepassword");
       }
    }
 });
});

module.exports = router;
