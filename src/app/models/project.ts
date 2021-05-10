export class Project {
  id: number;
  name: string;
  description: string;
  status: boolean;
  createdAt: Date;
  number: string;

  constructor(values = {}) {
    Object.assign(this, values);
  }
}
