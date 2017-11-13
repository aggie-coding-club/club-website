module.exports = function(req, res) {
    console.log('req.body =', req.body);
    res.sendStatus(200);
}