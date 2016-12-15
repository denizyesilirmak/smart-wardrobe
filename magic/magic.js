var request = require('request'),
    Forecast = require('forecast'),
    config = require('../config/config');

var forecast = new Forecast({
  service: 'darksky',
  key: config.weatherAPIKey,
  units: 'celcius',
  cache: true,
  ttl: {
    minutes: 120,
    seconds: 0
  }
});


exports.dateNow = function() {
	var date;
	var dateNow = new Date();
	date = dateNow.getHours() + ':' + dateNow.getMinutes() + ':' + dateNow.getSeconds() + ' ' + 
				 dateNow.getDate() + '-' + dateNow.getMonth() + '-' + dateNow.getFullYear();

	return date;
};

var locationForIp = function(req, callback) {
	var ip = req.headers['x-forwarded-for'] || 
     			 req.connection.remoteAddress || 
     			 req.socket.remoteAddress ||
           req.connection.socket.remoteAddress;

  request('http://freegeoip.net/json/' + '8.8.8.8', function(error, response, body) {
    if(!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      return callback([data.latitude, data.longitude]);
    }
    else
      console.log('Error ' + response.statusCode); 
  });
};

exports.weatherInfo = function(req, callback) {
  locationForIp(req, function(location) {
    forecast.get(location, function(err, weather) {
      if(err)
        console.dir(err);
      else
        callback(weather);
    });
  });
};

