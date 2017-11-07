var express = require('express');
var router = express.Router();

module.exports = {
    routes: function (clubData) {
        router.get('/', (req, res) => {
            res.json(clubData)
        })

        router.post('/github', (req, res) => {
            res.sendStatus(200);
        })
        return router;
    }
}