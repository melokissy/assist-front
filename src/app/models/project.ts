export class Project {
  id: number;
  name: string;
  description: string;
  status: boolean;

  constructor(values = {}) {
    Object.assign(this, values);
  }
}
