require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');

require('./models/User');
require('./services/passport');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

const app = express();
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);
app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes')(app);

app.listen(process.env.PORT);
