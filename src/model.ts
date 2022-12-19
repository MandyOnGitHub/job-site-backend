
// models
import fs from 'fs';
import * as model from './model.js';
import { RawJob, Job, Skill, nullObjectSkill } from './types.js';

// without JSON.parse buffer will be read
const rawJobs: RawJob[] = JSON.parse(fs.readFileSync('./src/data/jobs.json', 'utf-8'))
const skillInfos: any = JSON.parse(fs.readFileSync('./src/data/skillInfos.json', 'utf-8'))



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

export const getJobs = () => {
    const jobs: Job[] = [];
    rawJobs.forEach((rawJob: RawJob) => {
        const job: Job = {
            ...rawJob,
            skills: model.buildSkills(rawJob.skilllist)
        }
        jobs.push(job);
    })

    return jobs
}

export const buildSkills = (skilllist: string) => {
    const skills: Skill[] = [];
    const skillIdCodes = skilllist.split(',').map(skill => skill.trim());
    skillIdCodes.forEach(skillIdCode => {
        const _skill = skillInfos[skillIdCode]
        if (_skill === undefined) {
            const skill: Skill = {
                ...nullObjectSkill,
                idCode: skillIdCode,
            };
            skills.push(skill);
        } else {
            const skill: Skill = {
                idCode: skillIdCode,
                name: _skill.name,
                url: _skill.url,
                description: _skill.description,
            }
            skills.push(skill);
        }

    })

    return skills
}

export const getTodos = () => {
    const todos = rawJobs.map((job: RawJob) => {
        return {
            todo: job.todo,
            company: job.company,
            title: job.title,
        }
    })
    return todos
}