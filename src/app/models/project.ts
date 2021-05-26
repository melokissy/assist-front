import { User } from "./user";

export class Project {
  id: number;
  name: string;
  description: string;
  status: boolean;
  createdAt: Date;
  number: string;
  responsible: User;

  constructor(values = {}) {
    Object.assign(this, values);
  }
}
