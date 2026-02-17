const express = require('express');
const autRoute = require('./routes/aut.route');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json);
app.use('/api/aut', autRoute);
app.use(cookieParser());

module.exports = app;