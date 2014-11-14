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

router.get('/productlist/:productListId/findunshared/user/:userId', function(req, res) {
  var productListId = req.params.productListId;
  var userId = req.params.userId;
  var friendsToShare = productListService.getFriendsToShareList(productListId, userId);
  res.json(friendsToShare);
});

router.post('/productlist/sharelist', function(req, res) {
  var productListId = parseInt(req.body.productListId);
  var friends = JSON.parse(req.body.friends);
  console.log(friends);
  productListService.shareList(productListId, friends);

  res.status(200).send();
});

router.get('/productlist/share/all', function(req, res) {
  res.json(productListService.getAllShares());
});

router.get('/productlist/share/notshared/user/:userId', function(req, res) {
  var userId = req.params.userId;  
  res.json(productListService.getUnSharedProductLists(userId));
});

router.post('/productlist/removeproduct', function(req, res) {
  var productId = parseInt(req.body.productId);

  productListService.deleteProductFromProductList(productId);
  res.status(200).send();
});

router.post('/productlist/removeproductlist', function(req, res) {
  var productListId = parseInt(req.body.productListId);

  productListService.deleteProductList(productListId);
  res.status(200).send();
});

router.post('/productlist/addproduct', function(req, res) {
  var productListId = parseInt(req.body.productListId);
  var productAsin = req.body.productAsin;
  productListService.addItemToProductList(productListId, productAsin);
  res.status(200).send();
});

router.post('/productlist/create', function(req, res) {
  var productListTitle = req.body.title;
  var productListOwner = parseInt(req.body.ownerId); 
  var productList = productListService.createList(productListTitle, productListOwner);
  res.status(200).json({"list": productList}).send();
});

router.get('/productlist/:productListId', function(req, res) {
  var productListId = req.params.productListId;
  res.json(productListService.getProductList(productListId));
});

/* Vote Endpoints */
router.post('/vote/performvote', function(req, res) {
  var productId = parseInt(req.body.productId);
  var voterId = parseInt(req.body.voterId);
  var voteAmount = parseInt(req.body.vote);
  console.log(productId + " " + voterId + " " + voteAmount);
  voteService.performVote(productId, voterId, voteAmount);
  res.status(200).send();
});

router.get('/vote', function(req, res) {
  res.json(voteService.getAllVotes());
});

router.get('/vote/nonvotedproducts/productlist/:productListId/user/:userId', function (req, res) {
  var productListId = req.params.productListId;
  var userId = req.params.userId;

  res.json(voteService.getProductsNotVotedGivenProductList(productListId, userId));
});

router.post('/vote/finish', function(req, res) {
  var productListId = parseInt(req.body.productListId);
  var voterId = parseInt(req.body.voterId);

  productListService.updateSharedProductListToFinishedForUser(productListId, voterId);
  
  //TODO: Redirect to another page
  res.status(200).send();
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

  //Create Notification
  var product = productService.getProductGivenProductId(productId);
  var productList = productListService.getProductListGivenProductListId(product.product_list_id);
  var productDetails = productService.getProductDetailsGivenProduct(product);
  productDetails.product_list_title = productList.title;
  var productListOwner = userService.getUserFromUserId(productList.owner_id);
  productDetails.product_list_owner = productListOwner.name;
  var creatorObj = userService.getUserFromUserId(creatorId);  
  
  notificationService.createNotification(productListOwner.id, "COMMENT", creatorObj, productDetails);

  //TODO: Include RECOMMENT case

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

router.get('/collection/vote', function(req, res) {
	var products = [
		{
			productId: 1,
			image: "/images/testImage6.jpeg",
			description: "Best thing money can buy",
			price: 4.80
		},
		{
			productId: 2,
			image: "/images/testImage7.jpeg",
			description: "These pants will make you dance",
			price: 480.58
		},
		{
			productId: 3,
			image: "/images/testImage12.jpeg",
			description: "Socks are for jocks",
			price: 64.00
		}
	];
	var query = getQueryParams(req);
	console.log(query);
	res.render("vote", { products: products, currentUser: query.currentUser, showIntro: query.showIntro });
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
