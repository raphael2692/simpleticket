
import { User } from './user';

export class Ticket {
    url : string = "";
    id: number = 0;
    title : string = "";
    description : string = "";
    creationDate : Date = new Date();
    dueDate : Date  = new Date();
    // createdBy : User = new User;
    // requestedBy : User = new User;
    // requestedFor : User = new User;
    completed : boolean  = false;

}
