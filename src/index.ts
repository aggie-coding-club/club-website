import * as express from 'express';
import * as path from 'path';
import {officers} from './data/officers.json';
import {former} from './data/officers.json';

const app = express();
const port = process.env.PORT || 8080;

app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use('/static', express.static(path.join(__dirname, '/static')));

app.get('/', (req, res) => {
  res.render('index', {officers, former});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function activateDarkMode() {
  // set style to dark
}

declare global {
  interface Window { MyNamespace: any; }
}