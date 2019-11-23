import * as express from 'express';
import * as path from 'path';
import { officers } from './data/officers.json';
import { projects } from './data/projects.json';

const app = express();
const port = 3000;

app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use('/static', express.static(path.join(__dirname, '/static')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about', { officers });
});

app.get('/announcements', (req, res) => {
  const testCompetitions = [
    { name: 'Discord Bot', info: 'beep boop' },
    { name: 'Website', info: 'show them your power' },
    { name: 'Chess', info: 'make big brain play' },
  ];

  res.render('announcements', {
    competitions: testCompetitions,
  });
});

app.get('/projects', (req, res) => {
  res.render('projects', { projects });
});

app.get('/projects/learning', (req, res) => {
  res.render('learning_oriented_projects.html');
});

app.get('/projects/progress', (req, res) => {
  res.render('progress_oriented_projects.html');
});

app.listen(3000, () => {
  console.log(`Listening on port ${port}`);
});
