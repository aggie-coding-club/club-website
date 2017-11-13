var express = require('express');
var router = express.Router({ mergeParams: true });
var github = require('./github');
module.exports = function (calendar) {
    router.use('/events', require('./events')(calendar));
    router.get('/github', github);
    return router;
}