'use-strict';
var comments = require('../data/comments.json');
var commentIdIncrement = 1000;
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
    return comment;
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
  },
  getUniqueSetOfUserIdsFromComments: function(commentList) {
    var userIds = [];
    var uniqueElements;
    commentList.forEach(function(comment, index) {
      userIds.push(comment.creator_id);
    });
    var uniqueElements = userIds.filter(function(itm,i,userIds){
      return i == userIds.indexOf(itm);
    }); 
    return uniqueElements;
  }
};
