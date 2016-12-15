var ClothesModel = require('../models/Clothes'),
    clothesDb = require('../../magic/clothesDb'),
    notifications = require('./notifications'),
    magic = require('../../magic/magic'),
    fs = require('fs');

exports.isRfidProper = function(id) {
	if(id.toString().length === 8)
    return true;
  else
    return false;
};

exports.isRfidHere = function(id) {
  if(clothesDb.findClothe(id) != undefined)
    return true;
  else
    return false;
};

exports.changeStatus = function(id) {
  var status = clothesDb.changeStatus(id);
  notifications.newNotification('Clothe ' + id + ' is ' + status, id);
};

exports.newClothes = function(req, res) {
  res.render('pages/newClothes', {rfid: req.query.id});
};

exports.addNewClothes = function(req, res) {
	var id = req.body.id,
      displayImgName = req.file.filename,
		  name = req.body.name,
		  season = req.body.season,
		  lastTimeWorn = magic.dateNow(),
		  isHere = 'inside',
		  additionalInfo = req.body.additionalInfo;

	var newClothesRecord = new ClothesModel.Clothes(id, '/clothes_images/' + displayImgName, name, season, lastTimeWorn, isHere, additionalInfo);
  
  if(clothesDb.newClothesEntry(newClothesRecord)) {
    notifications.newNotification('RFID: ' + id + ' has been added successfully!', id);
  	res.render('pages/error', {msg: 'Done!'});
  }
  else
  	res.render('pages/error', {msg: 'Something went wrong :('});  	
};

exports.listAllClothes = function(req, res) {
  res.render('pages/clothes', {clothes: clothesDb.getClothes()});
};

exports.listBy = function(weatherState) {
  return clothesDb.listBy(weatherState);
}

exports.findClothe = function(req, res) {
  if(req.query.id != undefined) {
    clothe = clothesDb.findClothe(req.query.id);
    if(clothe != undefined)
      res.render('pages/clothe', {clothe: clothe});
    else
      res.redirect('/newClothes?id=' + req.query.id);
  }
};

exports.notificationToAddClothe = function(id) {
  notifications.newNotification('RFID: ' + id + ' needs to be added!', id);
};

exports.deleteClothe = function(req, res) {
  res.render('pages/deleteClothe', {clothe: clothesDb.findClothe(req.query.id)});
};

exports.removeClothe = function(req, res) {
  var id = req.query.id;

  if(clothesDb.removeClothe(id)) {
    notifications.newNotification('RFID: ' + id + ' has been removed successfully!', id);
    res.render('pages/error', {msg: 'Done!'});
  }
  else
    res.render('pages/error', {msg: 'Something went wrong :('});
};

exports.editClothe = function(req, res) {
  res.render('pages/editClothe', {clothe: clothesDb.findClothe(req.query.id)});
};

exports.updateClothe = function(req, res) {
  var id = req.query.id,
      name = req.body.name,
      season = req.body.season,
      additionalInfo = req.body.additionalInfo; 

  if(clothesDb.updateClothe(id, name, season, additionalInfo)) {
    notifications.newNotification('RFID: ' + id + ' has been updated successfully!', id);
    res.render('pages/error', {msg: 'Done!'});
  }
  else
    res.render('pages/error', {msg: 'Something went wrong :('});
};

