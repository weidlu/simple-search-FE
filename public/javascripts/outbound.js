let request = require('request'),
    config = require('../../config/config');

let myUrl = config.search;

module.exports = function(input,done){
    request.post({
        url:myUrl,
        body:input,
        json:true,
        timeout:30 * 60 * 1000
    }, function(err,httpResponse,body){
        done(body);
    })
};