import { User } from "./user";
import { Ticket } from "./ticket";

export class Attachment {
  id: number;
  file: ByteLengthChunk;
  ticket_id: Ticket;
  user_id: User;
  createdAt: Date;

  constructor(values = {}) {
    Object.assign(this, values);
  }
}
