import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login.services';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = {
    email: '',
    password: ''
  }

  user: User;

  mensagemErro: any;

  constructor(private loginService: LoginService
    , private roteador: Router) { }
  ngOnInit() { }

  handleLogin(formLogin: NgForm) {
    if (formLogin.valid) {
      this.loginService
        .logar(this.login)
        .subscribe(
          () => this.roteador.navigate(['/dashboard'])
          , (responseError: HttpErrorResponse) => this.mensagemErro = responseError.error

        )
    }
    this.mensagemErro.message = "Login inválido!";
  }

}
