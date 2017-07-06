const express = require('express');
const bcrypt = require('bcryptjs');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const dotenv = require('dotenv');
const favicon = require('serve-favicon');
const path = require('path');

const app = express();
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

app.use('/api', require('./routes/api'));
app.use('/', require('./routes/router'));

app.listen(process.env.PORT || 3000);
