const cookieParser = require('cookie-parser');
const express = require('express');
const router = require('../routes/auth.routes');

const app = express();
const cookie = cookieParser();

app.use(cookie);
app.use(express.json());

app.use('/api/auth', router);

module.exports = app;