import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Alert } from '../models/alert';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // apiUrl = 'http://localhost:41124/AssistApi/resource/users';

  apiUrl = `${environment.apiUrl}users/`;

  public lastId = 0;

  private users: User[] = [];

  constructor(private http: HttpClient) { }

  // GET /users
  listar() {
    return this.http
      .get(this.apiUrl)
      .pipe<User[]>(
        map(
          (response: any[]) => {
            return response
              .map(
                userApi => this.newUser(userApi)
              )
          }
        )
      )
  }

  newUser(userApi) {
    return new User({
      name: userApi.name,
      email: userApi.email,
      status: userApi.status,
      id: userApi.id,
      profile: userApi.profile
    })
  }

  // GET /users/:id
  public get(id: number): User {
    return this.users
      .filter(user => user.id === id)
      .pop();
  }

  // POST /users

  cadastrar(user: User) {

    return this.http
      .post(this.apiUrl, user)
      .pipe<User>(
        map(
          (user: any) => {
            return this.newUser(user);
          }
        )
      )
  }


  // PUT /user/:id
  public update(id: number, values: {}) {
    const user = this.get(id);

    if (!user) {
      return null;
    }

    const updatedUser = new User(values);
    const alert = this.validate(updatedUser, true);

    if (alert.isError()) {
      return alert;
    }

    Object.assign(user, values);
  }

  //DELETE
  public delete(id: number) {
    this.users = this.users.filter(user => user.id !== id);
    return this;
  }

  private validate(user: User, update = false): Alert {
    const alert = new Alert();
    if (user.name === '') {
      alert.setMessage('O campo nome é obrigatório');
      alert.setError(true);
    }

    if (user.email === '') {
      alert.setMessage('O campo email é obrigatório');
      alert.setError(true);
    }

    return alert;
  }
}
