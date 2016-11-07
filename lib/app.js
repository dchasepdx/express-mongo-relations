const express = require('express');
const app = express();
const errorHandler = require('./error-handler');
const morgan = require('morgan');

const auth = require('./routes/auth');
const regions = require('./routes/regions');
const tiWinners = require('./routes/ti-winners');
const teams = require('./routes/teams');

const ensureAuth = require('./auth/ensure-auth')();

app.use(morgan('dev'));
app.use('/auth', auth);
app.use('/teams', ensureAuth, teams);
app.use('/regions', ensureAuth, regions);
app.use('/winners', tiWinners);
app.use(errorHandler);

module.exports = app;