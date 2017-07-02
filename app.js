const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const sessions = require('client-sessions');
const dotenv = require('dotenv');
const path = require("path");

dotenv.load();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src/public')));

const User = require('./db/user');
//app.locals.pretty = true;
app.use(morgan('tiny'));
app.use(sessions({
   cookieName: process.env.cookieName,
   secret: process.env.secret,
   duration: 60 * 60 * 10000,
   activeDuration: 5 * 60 * 1000,
   httpOnly: true,
   secure: true,
   //ephemeral: true //delete cookie when browser is closed
}));

app.use((req, res, next) => {
   if(req.session && req.session.user){
      User.findOne({email: req.session.user.email}, (err, user) => {
         if (err) console.log(err);
         if(user){
            req.user = user;
            delete req.user.password;
            req.session.user = req.user;
            res.locals.user = req.user;
         }
         next();
      });
   }else{
      next();
   }
});

app.use('/login', require('./routes/login'));
app.use('/signup', require('./routes/signup'));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/tumblr", require("./routes/tumblr"));
app.use('/api/tumblr', require("./routes/tumblrApi"))
app.use('/api/posts', require("./routes/postApi"))
app.use('/add', require("./routes/post.js"))
app.use('/p', require("./routes/edit.js"))


app.get("/logout", (req, res) => {
   req.session.reset();
   res.redirect("/");
});

app.get('/api/isloggedin', (req, res) => {
  if(req.user) {
    res.send('yes')
  } else{
    res.send('no')
  }
})

app.use('', (req, res) => {
  res.sendFile(path.join(__dirname, './public', 'NotFound.html'));
})

app.listen(process.env.PORT || 3000);