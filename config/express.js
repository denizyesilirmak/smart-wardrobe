var express = require('express'),
		path = require('path'),
		bodyParser = require('body-parser'),
		morgan = require('morgan');

module.exports = function(app, config) {
  app.set('port', config.port);
  app.use(express.static(path.join(__dirname, config.publicPath)));
  app.set('views', path.join(__dirname, config.viewsPath))
  app.set('view engine', 'ejs');  
  app.use(morgan('combined'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  return;
  });
};
