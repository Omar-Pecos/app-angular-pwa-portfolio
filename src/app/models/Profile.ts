
export class Skill {
    _id : string;
    tech: any;
    percentage: number;
}

export class About {
    text: string;
    skills: Skill[];
}

export class Profile {
    _id : string;
    intro: string;
    about: About;
    version: number;
}