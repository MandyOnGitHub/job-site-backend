import express from 'express';
import fs from 'fs';
const app = express();
// app.use(cors());
// without JSON.parse buffer will be read
const jobs = JSON.parse(fs.readFileSync('./src/data/jobs.json', 'utf-8'));
const port = 5000;
app.get('/', (req, res) => {
    res.send('job site api');
});
app.get('/jobs', (req, res) => {
    res.json(jobs);
});
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map