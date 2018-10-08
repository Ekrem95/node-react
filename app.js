const express = require('express');
const bcrypt = require('bcryptjs');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const dotenv = require('dotenv');
const favicon = require('serve-favicon');
const path = require('path');
const cors = require('cors');

dotenv.load();

const app = express();
app.use(compression());

//app.locals.pretty = true;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('tiny'));
app.use(cors());

app.use(require('./middleware/session').sessions);
app.use(require('./middleware/session').userSession);

app.use('/api', require('./routes/api'));
app.use('/', require('./routes/router'));

app.listen(process.env.PORT || 3000);
