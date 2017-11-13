var express = require('express');
var router = express.Router();
var events_new = require('./new');
var events_delete = require('./delete');
var events_update = require('./update');
module.exports = function (calendar) {
    router.get('/', (req, res) => {
        res.json(calendar);
    });
    router.post('/new', events_new);
    router.post('/delete', events_delete);
    router.post('/update', events_update);
    return router;
}