import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class LoginService {

  apiUrl = `${environment.apiUrl}login/`;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
   }


  logar(dadosLogin) {
    return this.http
      .post(this.apiUrl, dadosLogin)
      .pipe(
        map((response: any) => {
          localStorage.setItem('currentUser', JSON.stringify(response));

          localStorage.setItem('user-autenticated-idUser', response.idUser);
          localStorage.setItem('user-autenticated-email', response.email);
          localStorage.setItem('user-autenticated-name', response.name);
          localStorage.setItem('user-autenticated-profile', response.profile);
          localStorage.setItem('assist-token', response.token);

          return response;
        })
      )
  }

}
