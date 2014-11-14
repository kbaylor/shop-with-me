var notifications = [];
var notificationIncrementId = 1;

module.exports = {
  getNotificationsGivenUserId: function(userId) {
    var userNotifications = [];
    notifications.forEach(function(notification, index) {
      if (notification.user_id == userId) {
        userNotifications.push(notification);
      }
    });
    return userNotifications;
  },
  createNotification: function(userId, type, content, relatedId) {
    var notification = {};
    notification.user_id = userId;
    notification.related_id = relatedId;
    notification.type = type;
    notification.id = notificationIncrementId;
    notificationIncrementId ++;
    notification.content = content;

    notifications.push(notification);
  }
}
