(function(app) {
	var lastCheckedUpdate = new Date();
	var currentUser = undefined;
	var currentUserInLocalStorage = undefined;
	function updateNotificationTab(numberOfNotifications) {
		if (numberOfNotifications === 0) {
			$("#notificationTab .badge").hide();
		} else {
			$("#notificationTab .badge").html(numberOfNotifications);
			$("#notificationTab .badge").show();
		}
	}
	setInterval(function() {
		var currentUserString = localStorage.getItem("ls.currentUser");
		if (currentUserString) {
			currentUserInLocalStorage = JSON.parse(currentUserString);
		}
		if (!currentUserInLocalStorage) {
			return;
		} else if (currentUser && currentUserInLocalStorage.id !== currentUser.id) {
			updateNotificationTab(0);
			newNotifications = 0;
			currentUser = currentUserInLocalStorage;
		} else {
			currentUser = currentUserInLocalStorage;
		}
		$.ajax({
			url: "/notifications/user/" + currentUser.id,
			success: function(notifications) {
				var totalUnacknowledged = 0;
				notifications.forEach(function(notification) {
					if (!notification.acknowledged) {
						totalUnacknowledged++;
					}
				});
				updateNotificationTab(totalUnacknowledged);
			},
			error: function(err) {
				console.log(err);
			}
		});
	}, 1000);
	$(document).ready(function() {
		$("#notificationTab").on('click', function() {
			$.ajax({
				url: "/notifications/user/" + currentUser.id + "/acknowledge",
				type: "POST",
				success: function() {
					newNotifications = 0;
					updateNotificationTab(newNotifications);
				}
			});
		})
	});
})(app || {});