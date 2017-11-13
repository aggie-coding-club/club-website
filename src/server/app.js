var app = require('express')();
var bodyParser = require('body-parser');
var github = require('./github-helper');
var googleHelper = require('./google-helper/');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
github.initializeClubData().then((clubData) => {
    googleHelper.calendarHelper.initCalendar((calendar) => {
        app.use('/', require('./routes')(calendar, clubData));
    });
});
app.listen(80);