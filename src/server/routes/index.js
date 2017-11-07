var express = require('express');
var router = express.Router();
var github = require('./github');
module.exports = {
    routes: function (clubData) {
        router.get('/', (req, res) => {
            res.json(clubData)
        })

        router.post('/github', github);
        return router;
    }
}