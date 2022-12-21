
// models
import fs from 'fs';
import * as model from './model.js';
import { RawJob, Job, Skill, nullObjectSkill, SkillTotal } from './types.js';

// set up low db
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url'
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
 
const __dirname = dirname(fileURLToPath(import.meta.url));
const dbFile = join(__dirname, `../src/data/db.json`);
const adapter = new JSONFile(dbFile);
const db:any = new Low(adapter);
await db.read();
// 

// without JSON.parse buffer will be read
// const rawJobs: RawJob[] = JSON.parse(fs.readFileSync('./src/data/jobs.json', 'utf-8'))
// const skillInfos: any = JSON.parse(fs.readFileSync('./src/data/skillInfos.json', 'utf-8'))



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
	<li><a href="totaledSkills">/totaledSkills</a> - array of skills with totals how often they occur in job listings</li>
</ul>
	`;
}

export const getJobs = () => {
    const rawJobs = db.data.jobs;
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
    const skillInfos = db.data.skillsInfo
    console.log("skillInfos", skillInfos);
    
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

export const getSkillTotals = () => {
	const skillTotals: SkillTotal[] = [];
	model.getJobs().forEach(job => {
		job.skills.forEach(skill => {
			const existingSkillTotal = skillTotals.find(skillTotal => skillTotal.skill.idCode === skill.idCode);
			if (!existingSkillTotal) {
				skillTotals.push({
					skill,
					total: 1
				});
			} else {
				existingSkillTotal.total++;
			}
		});
	})
	return skillTotals;
}

export const getTodos = () => {
    const rawJobs = db.data.jobs
    const todos = rawJobs.map((job: RawJob) => {
        return {
            todoText: job.todo,
            company: job.company,
            title: job.title,
            url: job.url
        }
    })
    return todos
}