const low = require('lowdb');
const db = low('./app/database/clothes.json');

exports.findClothe = function(id) {
  return db.get('clothes').find({id: id}).value();
};

exports.changeStatus = function(id) {
  if(db.get('clothes').find({id: id}).get('isHere') == 'taken') {
    var howManyTimesWorn =  db.get('clothes').find({id: id}).get('howManyTimesWorn') + 1;
  	db.get('clothes').find({id: id}).assign({isHere: 'inside', howManyTimesWorn: howManyTimesWorn}).value();
  }
  else
  	db.get('clothes').find({id: id}).assign({isHere: 'taken'}).value();

  return db.get('clothes').find({id: id}).get('isHere');
};

exports.newClothesEntry = function(newClothesObject) {
  if(db.get('clothes').push(newClothesObject).value())
    return true;
  else
    return false;
};

exports.removeClothe = function(id) {
  if(db.get('clothes').remove({id: id}).value())
    return true;
  else
    return false;
};

exports.getClothes = function() {
  return db.get('clothes').value();
};

exports.listBy = function(weatherState) {
  return db.get('clothes').filter({season: weatherState}).sortBy('howManyTimesWorn').take(8).value();
};

exports.updateClothe = function(id, name, season, additionalInfo) {
  if(db.get('clothes').find({id: id}).assign({name: name, season: season, additionalInfo: additionalInfo}).value())
    return true;
  else
    return false;  
};