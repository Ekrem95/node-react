const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcryptjs');
const fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: 'public/pictures' });

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.post('/', upload.any(), (req, res) => {
  console.log(req.files);
  res.end(req.file);
});

module.exports = router;
