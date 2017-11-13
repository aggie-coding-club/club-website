module.exports = function(req, res) {
    var googleCalendarHelper = require('../../google-helper/').calendarHelper;
    googleCalendarHelper.deleteEvent(req.body.eventId, (err) =>  {
        if (err) res.sendStatus(400);
        else res.sendStatus(200);
    })
}