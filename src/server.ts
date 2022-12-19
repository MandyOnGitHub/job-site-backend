import express from 'express'
import fs from 'fs'
import cors from 'cors';

const app = express();
app.use(cors());

// without JSON.parse buffer will be read
const jobs = (JSON.parse(fs.readFileSync('./src/data/jobs.json', 'utf-8')) as Job[])
const port = 5000;

type Job = {
    id: number,
    title: string,
    company: string,
    url: string,
    description: string,
    skilllist: string,
    todo: string,
}

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('job site api');
})

app.get('/jobs', (req: express.Request, res: express.Response) => {
    res.json(jobs)
})

app.get('/todos', (req: express.Request, res: express.Response) => {
    const todos = jobs.map((job: Job) => {
        return {
            todo: job.todo,
            company: job.company,
            title: job.title,
        }
    })
    res.json(todos)
})

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
})
