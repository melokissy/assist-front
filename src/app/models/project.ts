export class Project {
  id: number;
  name: string;
  description: string;
  status: boolean;
  createdAt: Date;

  constructor(values = {}) {
    Object.assign(this, values);
  }
}
