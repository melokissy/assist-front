import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Alert } from '../models/alert';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // apiUrl = 'http://localhost:41124/AssistApi/resource/users';

  apiUrl = `${environment.apiUrl}users/`;
  apiUrl_profile = `${environment.apiUrl}users/by-profile`;

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

  createUser(userData: User)  : Observable<User>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'})
    }
    return this.http.post<User>('http://localhost:41124/AssistApi/resource/users', userData, httpOptions);
  }

    // GET /users/by-profile
    userByProfile() {
      return this.http
        .get(this.apiUrl_profile)
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
      profile: userApi.profile,
      password: userApi.password,
      cpf: userApi.cpf,
      setor: userApi.setor
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
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'})
    }
    return this.http
      .post(this.apiUrl, user,httpOptions)
      .pipe<User>(
        map(
          (user: any) => {
            return this.newUser(user);
          }
        )
      )
  }

  getById(id: number) : Observable<User>{
    return this.http.get<User>(this.apiUrl+`${id}`);
  }


  public atualizar(id: number, user:User) : Observable<User>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'})
    }
    return this.http.put<User>(this.apiUrl+`${id}`, user,httpOptions);
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

  public delete(id: number) {
    this.users = this.users.filter(user => user.id !== id);
    return this;
  }

  public deleteUser(id: number){
    return this.http.delete(this.apiUrl+`${id}`).pipe(take(1));
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
