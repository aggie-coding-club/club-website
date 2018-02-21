let router = require('express').Router({ mergeParams: true });
const { GoogleController, GithubController } = require('../controllers')
const events = require('./events');
router.use('/events', events);
router.get('/init', async (req, res) => {
    GoogleController.events.pullCalendar((events) => {
        res.json({
            github: GithubController.getClubData(),
            events
        });
    })
})

module.exports = router;