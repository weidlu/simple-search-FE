var express = require('express');
var router = express.Router();
var out = require('../public/javascripts/outbound');
/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  const SIZE = 5;
  var searchInfo = new Object();
  searchInfo.start = req.body.page;
  searchInfo.keywords = req.body.searchword;
  searchInfo.size = SIZE;
  out(searchInfo, function (searchResult) {
      res.render('index', {res: searchResult, layout: false},function (err, html) {
          res.status(200).send(html);
      })
  });
});

module.exports = router;
