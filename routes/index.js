var express = require('express');
var router = express.Router();
var url = require('url');

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
