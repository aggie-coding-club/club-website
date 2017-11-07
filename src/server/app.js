var app = require('express')();
var indexRoutes = require('./routes/index');
var github = require('./github-helper');

github.initializeClubData().then((clubData) => {
    app.use('/', indexRoutes.routes(clubData));
});
app.listen(80);