const express = require('express');
const bodyParser = require('body-parser');

const db = require('./utils/database');
const server = require('./utils/server');
const settings = require('./settings');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.connect()
    .then(() => server.start(app, settings.general.port))
    // eslint-disable-next-line no-console
    .catch(({ message }) => console.log("Can't connect to database.", message));
