const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const app = express();

app.use(cors())
app.use(logger('dev'));
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({limit: '150mb', extended: true}));
app.use(express.urlencoded({limit: "40mb", extended: true, parameterLimit:100000}));
// app.use(express.text({ limit: '200mb' }));

app.use('/api/v1', require('./src/v1/routes'));

module.exports = app;