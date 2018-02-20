const BOT_CALENDAR_ID = require('../../../config').BOT_CALENDAR_ID;
const google = require('googleapis');
const calendar = google.calendar('v3');
const jwtClient = require('../jwtClient');

const pullCalendar = async (callback) => {
    jwtClient.authorize((err, tokens) => {
        if (err) {
            console.error(err);
            callback();
        } else {
            calendar.events.list({
                auth: jwtClient,
                calendarId: BOT_CALENDAR_ID
            }, (err, result) => {
                if (err) {
                    console.error(err);
                    callback();
                } else {
                    callback(result.items);
                }
            })
        }
    });
}

const insertEvent = (eventData, callback) => {
    calendar.events.insert({
        auth: jwtClient,
        calendarId: BOT_CALENDAR_ID,
        resource: eventData
    }, (err, event) => {
        if (err) {
            console.error(err);
            callback();
        }
        else callback(event);
    });
}

const deleteEvent = (eventId, callback) => {
    if (!eventId) callback(null);
    calendar.events.delete({
        auth: jwtClient,
        calendarId: BOT_CALENDAR_ID,
        eventId
    }, (err, response) => {
        if (err) {
            console.error(err);
            callback();
        } else callback(response);
    })
}

module.exports = {
    pullCalendar, addEvent, deleteEvent
};