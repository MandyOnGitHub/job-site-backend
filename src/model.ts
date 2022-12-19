// models
import fs from 'fs'

// without JSON.parse buffer will be read
const jobs = (JSON.parse(fs.readFileSync('./src/data/jobs.json', 'utf-8')) as Job[])
type Job = {
    id: number,
    title: string,
    company: string,
    url: string,
    description: string,
    skilllist: string,
    todo: string,
}



export const getApiInstructionsHtml = () => {
	return `
<style>
a, h1 {
	background-color: #ddd;
	font-family: courier;
}
</style>
<h1>GETAJOB API</h1>	
<ul>
	<li><a href="jobs">/jobs</a> - array of job listings will all fields</li>
	<li><a href="todos">/todos</a> - array of todos with todo/company/title fields</li>
	<li><a href="skillTotals">/skillTotals</a> - array of skills with totals how often they occur in job listings</li>
</ul>
	`;
}

export const getJobs = () =>{
    return jobs
}

export const getTodos = ()=> {
    const todos = jobs.map((job: Job) => {
        return {
            todo: job.todo,
            company: job.company,
            title: job.title,
        }
    })
    return todos
}