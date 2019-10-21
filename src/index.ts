import * as express from "express";
import * as path from "path";
const app = express();
const port = 3000;

app.use("/static", express.static(path.join(__dirname, "/static")));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'static/index.html'));
})

app.listen(3000, () => {
    console.log(`Listening on port ${port}`);
})
