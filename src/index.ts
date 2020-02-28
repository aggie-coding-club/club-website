import * as express from 'express';
import * as path from 'path';
import * as Octokit from '@octokit/rest';
import { GitHubController } from './controllers/GitHubController';
import { officers } from './data/officers.json';
import { projects } from './data/projects.json';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const gitHubController = new GitHubController(octokit);

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

// app.get('/announcements', (req, res) => {
//   const testCompetitions = [
//     { name: 'Discord Bot', info: 'beep boop' },
//     { name: 'Website', info: 'show them your power' },
//     { name: 'Chess', info: 'make big brain play' },
//   ];

//   res.render('announcements', {
//     competitions: testCompetitions,
//   });
// });

app.get('/projects', async (req, res) => {
  const projects = await gitHubController.getAllProjects('all');
  const learningOriented = gitHubController.filterProjects(
    'learning-oriented',
    projects
  );
  const progressOriented = gitHubController.filterProjects(
    'progress-oriented',
    projects
  );
  res.render('projects', { learningOriented, progressOriented });
});

app.listen(3000, () => {
  console.log(`Listening on port ${port}`);
});
