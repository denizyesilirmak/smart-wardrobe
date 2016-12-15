const low = require('lowdb');
const db = low('./app/database/notifications.json');

exports.createNewNotification = function(notificationObject) {
  db.get('notifications').unshift(notificationObject).value();
}

exports.getNotifications = function() {
  var allNotifications = db.get('notifications').value();
  return allNotifications;
};