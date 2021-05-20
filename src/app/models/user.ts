
export class User {
  id: number;
  name: string;
  email: string;
  status: boolean;
  password: string;
  profile: string;
  cpf: string;

  constructor(values = {}) {
    Object.assign(this, values);
  }
}
