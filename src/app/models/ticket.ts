import { User } from "./user";
import { Project } from "./project";

export class Ticket {

  id: number;
  subject: string;
  description: string;
  requester: User;
  type: string;
  priority: string;
  status: string;
  project: Project;
  responsible: User;
  createdAt: Date;
  editedAt: Date;
  closedAt: Date;
  dueDate: Date;
  number: string;
  comment: Comment;

  constructor(values = {}) {
    Object.assign(this, values);
  }
}
