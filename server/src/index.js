require('dotenv').config();
const express = require('express');
const app = express();

app.get('/', function(req, res) {
  res.send({ hi: 'there' });
});

app.listen(process.env.PORT);
