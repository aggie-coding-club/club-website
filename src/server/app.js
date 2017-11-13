var app = require('express')();
var bodyParser = require('body-parser');
var github = require('./github-helper');
var calendar = require('./calendar-helper');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
github.initializeClubData().then((clubData) => {
    calendar.initCalendar((calendar) => {
        app.use('/', require('./routes')());
    });
});
app.listen(80);
