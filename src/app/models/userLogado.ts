
export class UserLogado {
  name: string;
  email: string;
  profile: string;

  constructor(values = {}) {
    Object.assign(this, values);
  }
}
