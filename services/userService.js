var users = require('../data/users.json');
var productService = require('../services/productService.js');
var productListService = require('../services/productListService.js');

module.exports = {
  getFriendsGivenUserId: function(userId) {
    var friends = [];
    users.forEach(function(user, index) {
      if (user.id == userId) {
        //Get the array of friends for the user passed in
        var userFriends = user.friends;
        console.log(userFriends);
        userFriends.forEach(function(friend, index) {
          var friend = getUserGivenUserId(friend.friend_id);
          friends.push(friend);
        }); 
        return;
      }
    });
    return friends;
  },
  getUserIdFromProductId : function(productId) {
    var product = productService.getProductGivenProductId(productId);
    var productListId = product.product_list_id;
    console.log (productListId);
    var productList = productListService.getProductListGivenProductListId(productListId);
    return productList.owner_id; 
  }
}
var getUserGivenUserId = function(userId) {
  var userReturn;
  users.forEach(function(user, index) {
    if (user.id == userId) {
      userReturn = user;
      return;
    }
  });
  return userReturn;
} 


