module.exports = function (req, res) {
    var googleCalendarHelper = require('../../google-helper/').calendarHelper;
    googleCalendarHelper.insertEvent(req.body, (result) =>  {
        if (!result)    {
            res.sendStatus(401);
        }
        else    {
            res.send(result);
        }
    })
}