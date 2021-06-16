export class Historic {
  id: number;
  user_id: number;
  ticket_id: number;
  description: String;
  createdAt: Date;
  status: String;
  subject: String;
  ticket_description: String;
  priority: String;
  type: String;
  reponsible_id: number;

  constructor(values = {}) {
    Object.assign(this, values);
  }
}
