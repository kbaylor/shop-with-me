var productService = require('../services/productService.js');
var userVotes = [];
var voteIncrementId = 1000;

module.exports = {
  performVote: function(productId, voterId, voteAmount) {
    var product = productService.getProductGivenProductId(productId);
    if (voteAmount == 1){
      product.up_votes ++;
    } else {
      product.down_votes ++;
    }

    product.votes = product.votes + voteAmount;
    createUserVoteEntry(productId, voterId, voteAmount);
  },
  getAllVotes: function() {
    return userVotes;
  },
  getProductsNotVotedGivenProductList: function (productListId, userId) {
    var nonVotedProducts = [];
    var products = productService.getProductsForProductListId(productListId);
    products.forEach(function(product, index) {
      var userVoted = false;
      userVotes.forEach(function(userVote, index) {
        if (userVote.product_id == product.id && userVote.user_id == userId) {
          userVoted = true;
        }
      });
      if (userVoted == false){
        nonVotedProducts.push(product);
      }
    });
    return nonVotedProducts; 
  }
}

var createUserVoteEntry = function(productId, voterId, voteAmount) {
  var userVote = {}; 
  userVote.user_id = voterId;
  userVote.vote_amount = voteAmount;
  userVote.product_id = productId;
  userVote.id = voteIncrementId;
  voteIncrementId ++;
  userVotes.push(userVote);
}
