var google = require('googleapis');
var credentials = require('../google-credentials');
var jwtClient = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/calendar',
    ],
    null
);
var calendarHelper = require('./calendar-helper')(jwtClient);

module.exports = {
    calendarHelper
}