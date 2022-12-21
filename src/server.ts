import express from 'express'
import cors from 'cors';
import * as model from './model.js'

const app = express();
app.use(cors());
const port = 5000;


// controller

app.get('/', (req: express.Request, res: express.Response) => {
    res.send(model.getApiInstructionsHtml());
})

app.get('/jobs', (req: express.Request, res: express.Response) => {
    res.json(model.getJobs())
})

app.get('/todos', (req: express.Request, res: express.Response) => {
    res.json(model.getTodos())
})

app.get('/totaledSkills', (req: express.Request, res: express.Response) => {
    res.json(model.getSkillTotals())
})

app.delete('/jobs/:id', async (req: express.Request, res: express.Response) => {
    const id = Number(req.params.id)
    const deletedObject = await model.deleteJob(id)
    console.log(deletedObject, 'deletedObject');
    
    if(deletedObject === undefined){
        res.status(409).send({
            error:true,
            message: `job with ${id} does not exist, deletion failed.`
        })
    }else{
        res.status(200).json(deletedObject)
    }
    
})



app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
})
