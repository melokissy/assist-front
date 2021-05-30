import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class LoginService {

  // api = 'http://localhost:3200/login'
  apiUrl = `${environment.apiUrl}login/`;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;


  constructor(private http: HttpClient) {
    // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    // this.currentUser = this.currentUserSubject.asObservable();

   }

//   public get currentUserValue(): User {
//     return this.currentUserSubject.value;
// }

  logar(dadosLogin) {
    return this.http
      .post(this.apiUrl, dadosLogin)
      .pipe(
        map((response: any) => {
          localStorage.setItem('currentUser', JSON.stringify(response));

          localStorage.setItem('user-autenticated-email', response.email);
          localStorage.setItem('user-autenticated-name', response.name);
          localStorage.setItem('user-autenticated-profile', response.profile);
          localStorage.setItem('assist-token', response.token);
          // this.currentUserSubject.next(response);

          return response;
        })
      )
  }

//   logout() {
//     // remove user from local storage to log user out
//     localStorage.removeItem('currentUser');
//     this.currentUserSubject.next(null);
// }

}
