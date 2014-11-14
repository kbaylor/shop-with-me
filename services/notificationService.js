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
  createNotification: function(userId, type, actorObject, relatedObject) {
    var notification = {};
    notification.user_id = userId;
    notification.type = type;
    notification.id = notificationIncrementId;
    notificationIncrementId ++;
    notification.actor = actorObject;
    notification.related_object = relatedObject;
    notification.created_date = new Date();
    
    notifications.push(notification);
  }
}
