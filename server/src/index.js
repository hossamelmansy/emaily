require('dotenv').config();
const express = require('express');

require('./services/passport');

const app = express();
require('./routes/authRoutes')(app);

app.listen(process.env.PORT);
