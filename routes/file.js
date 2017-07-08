const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcryptjs');
const fs = require('fs');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.post('/', (req, res) => {
  console.log(req.body);

  //fs.writeFile('./data.json', JSON.stringify(req.body, null, 2), 'utf-8');
  res.redirect('/');
});

module.exports = router;
