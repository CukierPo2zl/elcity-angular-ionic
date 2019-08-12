import { User } from './user';


export class Spot {
    constructor(
    public url: string,
    public id: number,
    public content: string,
    public anonymous: boolean,
    public user: User,
    ){}
}

