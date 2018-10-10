const express = require('express');
const router = express.Router();
const { Post, User } = require('../db');

router.get('/posts', async (req, res) => {
    const list = await Post.find({ sort: { _id: -1 } });
    res.send(list);
});

router.get('/posts/:skip', async (req, res) => {
    const offset = Number(req.params.skip) || 0;
    const list = await Post.find({ limit: 5, offset, sort: { _id: -1 } });

    res.send(list);
});

router.get('/count/posts', async (req, res) => {
    const count = await Post.count({});
    res.send(count + '');
});

router.get('/isloggedin', (req, res) => {
    if (req.user) return res.send('yes');
    res.send('no');
});

router.get('/usr', async (req, res) => {
    if (!req.user) return res.redirect('/login');

    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).json({ error: 'User not found' });

    res.send(user);
});

router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).json({ error: 'Post not found' });

    res.send(post);
});

module.exports = router;
