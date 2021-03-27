import { User } from "./user";

export class Ticket {

  id: number;
  subject: string;
  description: string;
  requester: User;
  type: string;
  priority: string;
  status: string;
  project_id: number;
  responsible: User;
  createdAt: Date;
  editedAt: Date;
  closeAt: Date;
  dueDate: Date;

  constructor(values = {}) {
    Object.assign(this, values);
  }
}
