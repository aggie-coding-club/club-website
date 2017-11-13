var bot_calendar_id = require('../config').bot_calendar_id;
var google = require('googleapis');
var calendar = google.calendar('v3');
var _jwtClient;
//Formats a Date object in the way that Google wants it
Date.prototype.toRFC3339 = function () {
    function pad(n) { return n < 10 ? '0' + n : n }
    return this.getUTCFullYear() + '-'
        + pad(this.getUTCMonth() + 1) + '-'
        + pad(this.getUTCDate()) + 'T'
        + pad(this.getUTCHours()) + ':'
        + pad(this.getUTCMinutes()) + ':'
        + pad(this.getUTCSeconds()) + 'Z'
}
function initCalendar(callback) {
    _jwtClient.authorize((err, tokens) => {
        if (err) {
            console.log(err);
            return;
        }
        calendar.events.list({
            auth: _jwtClient,
            calendarId: bot_calendar_id
        }, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            callback(result.items);
        })
    })
}

function insertEvent(eventData, callback) {
    calendar.events.insert({
        auth: _jwtClient,
        calendarId: bot_calendar_id,
        resource: eventData,
    }, (err, event) => {
        if (err) {
            console.log(err);
            callback(null);
        }
        callback(event);
    })
}

function deleteEvent(eventId, callback) {
    if (!eventId) callback(null);
    calendar.events.delete({
        auth: _jwtClient,
        calendarId: bot_calendar_id,
        eventId: eventId
    }, (err, response) => {
        if (err) {
            console.log(err);
            callback(err);
        }
        callback(response);
    })
}

module.exports = function (jwtClient) {
    _jwtClient = jwtClient;
    return { initCalendar, insertEvent, deleteEvent };
}