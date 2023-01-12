
import { User } from './user';

export interface Ticket {
    url : string;
    id?: number;
    title : string;
    description : string;
    creationDate ?: Date;
    dueDate ?: Date;
    createdBy ?: User | string;
    requestedBy ?: User | string;
    requestedFor ?: User | string;
    completed : boolean;

}
