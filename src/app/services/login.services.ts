import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable()
export class LoginService {

  // api = 'http://localhost:3200/login'
  apiUrl = `${environment.apiUrl}login/`;


  constructor(private http: HttpClient) { }

  logar(dadosLogin) {
    return this.http
      .post(this.apiUrl, dadosLogin)
      .pipe(
        map((response: any) => {
          localStorage.setItem('assist-token', response.token);

          return response;
        })
      )
  }

}
