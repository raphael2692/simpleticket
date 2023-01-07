
import { User } from './user';

export interface Ticket {
    url : string;
    id?: number;
    title : string;
    description : string;
    creationDate ?: Date;
    dueDate ?: Date;
    createdBy ?: User;
    requestedBy ?: User;
    requestedFor ?: User;
    completed : boolean;

}
