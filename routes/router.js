const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { Post, User } = require('../db');

router.get('/changepassword', (req, res) => {
    if (!req.user) return res.redirect('/login');

    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('/logout', (req, res) => {
    req.session.reset();
    res.redirect('/');
});

router.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public', 'index.html')));

router.post('/signup', async (req, res) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

        const newUser = await User.save({ email: req.body.email, password: hash });

        req.session.user = newUser;
        res.redirect('/dashboard');
    } catch (err) {
        if (err.code === 11000) return res.status(400).json({ err: 'Email is already taken' });

        res.status(400).json({ err });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) return res.status(400).send({ error: 'User does not exist' });

        // if operation is successful, redirect user to dashboard
        if (bcrypt.compareSync(req.body.password, user.password)) {
            req.session.user = user;
            return res.redirect('/dashboard');
        }

        res.redirect('login');
    } catch (error) {
        res.status(400).json({ error });
    }
});

// Update a post
router.post('/p', async (req, res) => {
    const id = req.headers.referer.split('/').pop();
    const { title, desc, src } = req.body;

    try {
        await Post.update({ criteria: { _id: id }, data: { title, desc, src } });
    } catch (err) {
    } finally {
        res.redirect('/dashboard');
    }
});

// add a comment
router.post('/p/d', async (req, res) => {
    const id = req.body.id || req.headers.referer.split('/').pop();
    const comments = req.body.box;

    try {
        await Post.update({ criteria: { _id: id }, data: { $push: { comments } } });
    } catch (err) {
    } finally {
        res.redirect('/dashboard');
    }
});

// Add a post
router.post('/add', async (req, res) => {
    try {
        const newPost = await Post.save({
            title: req.body.title,
            src: req.body.src,
            desc: req.body.desc,
        });
    } catch (err) {
    } finally {
        res.redirect('/dashboard');
    }
});

router.post('/changepassword', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });

        if (!user) return res.status(400).send({ error: 'User does not exist' });

        // if passwords does not match, redirect user to try again
        if (!bcrypt.compareSync(req.body.old, user.password)) {
            return res.redirect('changepassword');
        }

        // double check the new password
        if (req.body.new !== req.body.assert) return res.redirect('/changepassword');

        const hash = bcrypt.hashSync(req.body.new, bcrypt.genSaltSync(10));

        await User.update({ criteria: { _id: req.user._id }, data: { password: hash } });

        // logout after changing password
        res.redirect('/logout');
    } catch (error) {
        res.status(400).json({ error });
    }
});

const upload = multer({ storage });
// Set multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

router.post('/add/file', upload.any(), (req, res) => res.redirect('/'));

module.exports = router;
