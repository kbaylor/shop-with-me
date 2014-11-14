'use-strict';
var comments = require('../data/comments.json');
var commentIdIncrement = 3;
var userService = require('../services/userService.js');

module.exports = {
  createComment: function(productId, creatorId, content) {
    var comment = {};
    comment.content = content;
    comment.id = commentIdIncrement;
    commentIdIncrement ++;
    comment.creator_id = creatorId;
    comment.product_id = productId;
    comments.push(comment);
  },
  getCommentsGivenProductId: function(productId) {
    var commentsForProduct = [];
    comments.forEach(function(comment, index) {
      if (comment.product_id == productId){
        comment.creator = userService.getUserFromUserId(comment.creator_id);
        commentsForProduct.push(comment);
      }
    });
    return commentsForProduct;
  }
};