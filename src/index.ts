import * as express from 'express';
import * as path from 'path';

const app = express();
const port = 3000;

app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use('/static', express.static(path.join(__dirname, '/static')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/announcements', (req, res) => {
    let testCompetitions = [
        { name: 'Discord Bot', info: 'beep boop' },
        { name: 'Website', info: 'show them your power' },
        { name: 'Chess', info: 'make big brain play' }
    ] 

    res.render('announcements', {
        competitions: testCompetitions
    });
});

app.listen(3000, () => {
    console.log(`Listening on port ${port}`);
});
