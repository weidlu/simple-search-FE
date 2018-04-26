var express = require('express');
var router = express.Router();
var out = require('../public/javascripts/outbound');
/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req.query);
    var searchInfo = new Object();
    const SIZE = 5;
    searchInfo.keywords = req.query.searchword;
    searchInfo.size = SIZE;
    out(searchInfo, function (searchResult) {
        console.log(typeof searchResult, JSON.stringify(searchResult));
        let isSearched = false;
        let hasResults = false;
        if (req.query.searchword !== undefined && req.query.searchword !== ''){
            isSearched = true;
            try{
                if (searchResult.results.length !== 0){
                    hasResults = true;
                }
            }catch (e){
                console.log(e);
                console.log(searchResult);
            }
        }
        let renderInfo;
        if (isSearched == false){
            renderInfo = {title: 'Just Search'}
        }else if (hasResults == false){
            renderInfo = {title: 'Search ' + req.query.searchword, searchInput: req.query.searchword}
        }else {
            renderInfo = {title: 'Search ' + req.query.searchword, searchInput: req.query.searchword, res: searchResult}
        }
        res.render('index', renderInfo)
    });
});

module.exports = router;
