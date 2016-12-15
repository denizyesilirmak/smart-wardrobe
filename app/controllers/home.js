var notifications = require('./notifications');

exports.index = function(req, res) {
  res.render('pages/index', {notifications: notifications.listNotifications()});
};