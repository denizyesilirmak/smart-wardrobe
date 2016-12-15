var notificationModel = require('../models/Notifications'),
    notificationDb = require('../../magic/notificationDb'),
    magic = require('../../magic/magic');

exports.listNotifications = function(req, res) {
	return notificationDb.getNotifications();
};

exports.newNotification = function(msg, id) {
  var notification = new notificationModel.Notification(id, magic.dateNow(), msg);
  notificationDb.createNewNotification(notification);
};