const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('../db/user');
const Post = require('../db/post');

router.get('/changepassword', (req, res) => {
  if (!req.user) {
    res.redirect('/login');
  }

  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('/logout', (req, res) => {
  req.session.reset();
  res.redirect('/');
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.post('/signup', (req, res) => {
  var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  var user = new User({
    email: req.body.email,
    password: hash,
  });
  user.save(err => {
    if (err) {
      if (err.code === 11000) {
        var error = 'That email is already taken';
      }

      res.send({ error: err });
    }else {
      req.session.user = user;
      res.redirect('/dashboard');
    }
  });
});

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) console.log(err);
    if (!user) {
      res.send({ error: 'No user' });
    }else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        req.session.user = user;
        res.redirect('/dashboard');
      }else {
        res.redirect('login');
      }
    }
  });
});

router.post('/p', (req, res) => {
  const id = req.headers.referer.split('/').pop();
  Post.update({
    _id: id,
  }, {
    $set: {
      title: req.body.title,
      desc: req.body.desc,
      src: req.body.src,
    }, },
{ upsert: false }, function (err, doc) {
    if (err) console.log(err);
  });

  res.redirect('/dashboard');
});

router.post('/p/d', (req, res) => {
  if (req.body.box.length > 0) {
    const id = req.headers.referer.split('/').pop();
    Post.update({
      _id: id,
    }, {
      $push: {
        comments: req.body.box,
      }, },
    { upsert: false }, function (err, doc) {
      if (err) console.log(err);
    });

    res.redirect('/dashboard');
  } else {
    res.redirect('/dashboard');
  }
});

router.post('/add', (req, res) => {
  var post = new Post({
    title: req.body.title,
    src: req.body.src,
    desc: req.body.desc,
  });
  post.save(err => {
    if (err) {
      console.log(err);
      res.redirect('/dashboard');
    }else {
      //req.session.user = user;
      res.redirect('/dashboard');
    }
  });
});

router.post('/changepassword', (req, res) => {
  User.findOne({ email: req.user.email }, (err, user) => {
    if (err) console.log(err);
    if (!user) {
      res.send({ error: 'No user' });
    }else {
      if (bcrypt.compareSync(req.body.old, user.password)) {
        if (req.body.new === req.body.assert) {
          var hash = bcrypt.hashSync(req.body.new, bcrypt.genSaltSync(10));
          User.update({
            _id: req.user._id,
          }, {
            $set: {
              password: hash,
            }, },
          { upsert: false }, function (err, doc) {
              if (err) console.log(err);
            });

          res.redirect('/logout');
        }else {
          res.redirect('/changepassword');
        }
      }else {
        res.redirect('changepassword');
      }
    }
  });
});

module.exports = router;
