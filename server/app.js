var app = require('express')();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const {GithubController} = require('./controllers');
const routes = require('./routes');

const init = async () => {
    await GithubController.pullClubData();
    app.use('/', routes);
    app.listen(3001, () => {
        console.log('Listening on port 3001!');
    });
}

init();
