import { User } from "./user";

export class Historic {
  id: number;
  user: User;
  ticket_id: number;
  description: String;
  createdAt: Date;
  status: String;
  subject: String;
  ticket_description: String;
  priority: String;
  type: String;
  ticket_responsible: User;

  constructor(values = {}) {
    Object.assign(this, values);
  }
}
