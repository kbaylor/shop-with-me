var users = require('../data/users.json');

module.exports = {
  getFriendsGivenUserId: function(userId) {
    var friends = [];
    users.forEach(function(user, index) {
      if (user.id == userId) {
        // Get the array of friends for the user passed in
        var userFriends = user.friends;
        userFriends.forEach(function(friend, index) {
          var friend = getUserObjGivenUserId(friend.friend_id);
          friends.push(friend);
        }); 
        return;
      }
    });
    return friends;
  },
  getUserFromUserId: function(userId) {
    return getUserObjGivenUserId(userId);
  }
};

var getUserObjGivenUserId = function(userId) {
  var userReturn;
  users.forEach(function(user, index) {
    if (user.id == userId) {
      userReturn = user;
      return;
    }
  });
  return userReturn;
};