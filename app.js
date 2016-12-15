var express = require('express'),
	config = require('./config/config');

const low = require('lowdb');

const clothesDb = low(config.dbPath + 'clothes.json');
const notificationsDb = low(config.dbPath + 'notifications.json');

clothesDb.defaults({clothes: []}).value();
notificationsDb.defaults({notifications: []}).value();

var app = express();

require('./config/express')(app, config);
require('./config/routes')(app);

app.listen(config.port);