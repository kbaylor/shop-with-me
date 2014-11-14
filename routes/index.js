var express = require('express');
var router = express.Router();

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

module.exports = router;
