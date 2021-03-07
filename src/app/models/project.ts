export class Project {
  id: number;
  name: string;
  description: string;
  status: string;

  constructor(values = {}) {
    Object.assign(this, values);
  }
}
