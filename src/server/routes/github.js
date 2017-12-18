module.exports = function (req, res) {
    var githubHelper = require('../github-helper');
    res.json(githubHelper.getClubData());
}