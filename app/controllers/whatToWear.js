//weather api
var	magic = require('../../magic/magic'),
		clothes = require('./clothes');
	  
//clothes sort by weather

exports.showList = function(req, res) {
  magic.weatherInfo(req, function(weather) {
    res.render('pages/whatToWear', {temperature: weather.currently.temperature, state: weather.currently.summary, 
    								clothes: clothes.listBy(weatherInfoParser(weather.currently.temperature))});
  });
};
//gets ip and finds location

var weatherInfoParser = function(temperature) {
	if(temperature >= 20)
		return 'Summer';
	else if(temperature < 20 && temperature >= 10)
		return 'Spring';
	else if(temperature < 10 && temperature >= 0)
		return 'Autumn';
	else if(temperature < 0)
		return 'Winter';
};