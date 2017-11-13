var express = require('express');
var router = express.Router({ mergeParams: true });
var github = require('./github');
module.exports = function () {
    router.use('/events', require('./events')());
    router.post('/github', github);
    return router;
}
