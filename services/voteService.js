var productService = require('../services/productService.js');
var userVotes = [];
var voteIncrementId = 1;

module.exports = {
  performVote: function(productId, voterId, voteAmount) {
    var product = productService.getProductGivenProductId(productId);
    product.votes = product.votes + voteAmount;
    createUserVoteEntry(productId, voterId, voteAmount);
  },
  getAllVotes: function() {
    return userVotes;
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
