var notifications = {};
var notificationIncrementId = 1;

module.exports = {
  getNotificationsGivenUserId: function(userId) {
    var userNotifications = notifications[userId];
    userNotifications.sort(function(a, b) {
      return (a > b) ? -1 : 1;
    });
    return userNotifications;
  },
  createNotification: function(userId, type, actorObject, relatedObject) {
    var notification = {};
    notification.user_id = userId;
    notification.type = type;
    notification.id = notificationIncrementId;
    notificationIncrementId ++;
    notification.actor = actorObject;
    notification.related_object = relatedObject;
    notification.created_date = new Date();
    notifications.acknowledged = false;
    if (!notifications[userId]) {
      notifications[userId] = [];
    }
    notifications[userId].push(notification);
  },
  acknowledgeNotifications: function(userId) {
    var userNotifications = notifications[userId] || [];
    userNotifications.forEach(function(notification) {
      notification.acknowledged = true;
    });
  }
}
