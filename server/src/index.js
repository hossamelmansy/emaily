require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

require('./services/passport');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

const app = express();
require('./routes/authRoutes')(app);

app.listen(process.env.PORT);
