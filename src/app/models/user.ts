export class User {
  id: number;
  name: string;
  email: string;
  status: boolean;
  password: string;
  profile: string;

  constructor(values = {}) {
    Object.assign(this, values);
  }
}
