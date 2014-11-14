var express = require('express');
var router = express.Router();
var url = require('url');

var productService = require('../services/productService.js');
var productListService = require('../services/productListService.js');
var voteService = require('../services/voteService.js');
var commentService = require('../services/commentService.js');
var userService = require('../services/userService.js');
var notificationService = require('../services/notificationService.js');

// Let's get all of our query parameters
var url = require('url');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET item-view */
router.get('/item-view', function(req, res) {
    res.render('item-view', getQueryParams(req));
});

router.get('/individual-item-view', function(req, res) {
  res.render('individual-item-view', getQueryParams(req));
});


/* JSON Endpoints */

/* Product Endpoints */
router.get('/productlist/:productListId/products', function(req, res) {
  var productListId = req.params.productListId;
  res.json(productService.getProductsForProductListId(productListId));
});

router.get('/products/all', function(req, res) {
  res.json(productService.getAllAmazonProducts());
});

/* Product List Endpoints */
router.get('/productlist/user/:userId', function(req, res) {
  var userId = req.params.userId;
  res.json(productListService.getOwnedProductLists(userId));
});

router.get('/productlist/share/user/:userId', function(req, res) {
  var userId = req.params.userId;
  res.json(productListService.getSharedProductLists(userId));
});

router.post('/productlist/removeproduct', function(req, res) {
  var productId = parseInt(req.body.productId);
  
  productListService.deleteProductFromProductList(productId);
  res.status(200).send();
});


/* Vote Endpoints */
router.post('/vote/performvote', function(req, res) {
  var productId = parseInt(req.body.productId);
  var voterId = parseInt(req.body.voterId);
  var voteAmount = parseInt(req.body.vote);

  voteService.performVote(productId, voterId, voteAmount);
  res.status(200).send();
});

router.get('/vote', function(req, res) {
  res.json(voteService.getAllVotes());
});

/* Comment Endpoints */
router.get('/comments/product/:productId', function(req, res) {
  var productId = req.params.productId;

  res.json(commentService.getCommentsGivenProductId(productId));
});

router.post('/comments/createcomment', function(req, res) {
  var productId = parseInt(req.body.productId);
  var creatorId = parseInt(req.body.creatorId);
  var content = req.body.content;

  commentService.createComment(productId, creatorId, content);
  res.status(200).send();
});


/* User Endpoints */
router.get('/users/:userId/friends', function(req, res) {
  var userId = req.params.userId;
  
  res.json(userService.getFriendsGivenUserId(userId));
});


/* Notification Endpoints */
router.get('/notifications/user/:userId', function(req, res) {
  var userId = req.params.userId;
  
  res.json(notificationService.getNotificationsGivenUserId(userId));
});

/* END JSON Endpoints */

var getQueryParams = function(request) {
    var url_parts = url.parse(request.url, true);
    return url_parts.query;
}

router.get('/test', function(req, res) {
  console.log(req);
});

router.get('/notifications', function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var notifications = [
	{ 
		image: "/images/testImage4.jpeg",
		name: "Ally",
		collection: "Halloween Weekend",
		description: "asked you to rate her",
		time: "1 Hour Ago"
	},
	{ 
		image: "/images/testImage5.jpeg",
		name: "Marky Mark",
		collection: "Pink Panther",
		description: "commented on your",
		time: "4 Hours Ago"
	},
	{
		image: "/images/testImage10.jpeg",
		name: "Nick",
		collection: "Pink Panther",
		description: "commented on your",
		time: "1 Day Ago"
	},
	{
		image: "/images/testImage9.jpeg",
		name: "John",
		collection: "Blue Steel",
		description: "also commented on the Ten Gallon Cowboy Hat in Derek's",
		time: "1 Day Ago"
	}
  ];
  res.render('notifications', { notifications: notifications });
});

module.exports = router;
