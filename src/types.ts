export type RawJob = {
    id: number,
    title: string,
    company: string,
    url: string,
    description: string,
    skilllist: string,
    todo: string,
}

export type Job = {
    id: number,
    title: string,
    company: string,
    url: string,
    description: string,
    skilllist: string,
    skills: Skill[],
    todo: string,
}

export type Skill = {
    idCode: string,
    name: string,
    url: string,
    description: string,
}

export const nullObjectSkill = {
    idCode: '',
    name: '',
    url: '',
    description: '',
}
