const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const dotenv = require('dotenv');
const favicon = require('serve-favicon');
const path = require('path');

dotenv.load();
//app.locals.pretty = true;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('tiny'));
app.use(compression());

app.use(require('./middleware/middleware').sessions);
app.use(require('./middleware/middleware').userSession);

app.use('/login', require('./routes/login'));
app.use('/signup', require('./routes/signup'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/tumblr', require('./routes/tumblr'));
app.use('/api', require('./routes/api'));
app.use('/add', require('./routes/post.js'));
app.use('/p', require('./routes/edit.js'));
app.use('/changepassword', require('./routes/password.js'));

app.get('/logout', (req, res) => {
  req.session.reset();
  res.redirect('/');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public', 'index.html'));
});

app.listen(process.env.PORT || 3000);
