export class User {
  id: number;
  name: string;
  email: string;
  status: string;
  password: string;

  constructor(values = {}) {
    Object.assign(this, values);
  }
}
