const express = require('express');
const app = express();
const teams = require('./routes/teams');
const errorHandler = require('./error-handler');
const regions = require('./routes/regions');
const tiWinners = require('./routes/ti-winners');

app.use('teams', teams);
app.use('/regions', regions);
app.use('/winners', tiWinners);
app.use(errorHandler);

module.exports = app;