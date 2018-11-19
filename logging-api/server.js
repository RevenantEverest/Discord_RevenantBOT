require('dotenv').config();

/* Dependencies */
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

/* Route Imports */

/* Middleware */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Routes */


/* Default Routes */
app.use("/", (req, res) => {
  res.json({
    message: "Fireside-Logging API"
  });
});

app.listen(PORT, () => {
  console.log(`Fireside-Logs: Listening on port ${PORT}`);
});
