const { client_email, private_key } = require('./google-credentials');
const google = require('googleapis');
module.exports = new google.auth.JWT(
    client_email,
    null,
    private_key,
    ['https://www.googleapis.com/auth/calendar',
    ],
    null
);