import { User } from "./user";
import { Ticket } from "./ticket";

export class Comment {
  id: number;
  user: User;
  comment: string;
  ticket: Ticket;
  createdAt: Date;

  constructor(values = {}) {
    Object.assign(this, values);
  }
}
