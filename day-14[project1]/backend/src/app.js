const express = require('express');
const cookieParser = require('cookie-parser');
const authRout = require('./routes/auth.routes');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRout);

module.exports = app;