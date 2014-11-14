(function(app) {
	var lastCheckedUpdate = new Date();
	var newNotifications = 0;
	function updateNotificationTab(numberOfNotifications) {
		if (numberOfNotifications === 0) {
			$("#notificationTab .badge").hide();
		} else {
			$("#notificationTab .badge").html(numberOfNotifications);
			$("#notificationTab .badge").show();
		}
	}
	setInterval(function() {
		$.ajax({
			url: "/notifications/user/3",
			success: function(notifications) {
				notifications = [1];
				notifications.forEach(function(notification) {
					if (notification > 0) {
						console.log(newNotifications)
						newNotifications++;
					}
					lastCheckedUpdate = new Date();
					updateNotificationTab(newNotifications);
				});
			}
		});
	}, 10000);
	$(document).ready(function() {
		$("#notificationTab").on('click', function() {
			newNotifications = 0;
			updateNotificationTab(newNotifications);
		})
	});
})(app || {});