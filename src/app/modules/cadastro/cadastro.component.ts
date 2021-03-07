import {HttpErrorResponse} from '@angular/common/http';
import { User } from './../../models/user';
import { HttpResponseBase } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map, catchError } from "rxjs/operators";
import { Router } from '@angular/router';
import { UsersComponent } from '../user/user.component';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  mensagensErro: any;

  formCadastro = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    userIcon: new FormControl()
  })

  constructor(private httpClient: HttpClient,
    private roteador: Router) { }

  ngOnInit() {

   }

  handleCadastrarUsuario() {
    if (this.formCadastro.valid) {
      const userData = new User(this.formCadastro.value);
      console.log(userData);
      this.httpClient
        .post('http://localhost:41124/AssistApi/resource/users', userData)
        .subscribe(
          () => {
            console.log(`Cadastrado com sucesso`);
            this.formCadastro.reset()

            //após 1 segundo, redireciona para a rota de login
            setTimeout(() => {
              this.roteador.navigate(['/users']);
            }, 1000);
          }
          ,(responseError: HttpErrorResponse) => {
            //resposta caso existam erros!
            this.mensagensErro = responseError.error.body
            // this.mensagensErro = responseError
            }
        )
    }
    else {
      this.validarTodosOsCamposDoFormulario(this.formCadastro);
    }
  }

  validarTodosOsCamposDoFormulario(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control.markAsTouched({ onlySelf: true });
    })
  }

  validaImagem(campoDoFormulario: FormControl) {
    return this.httpClient
      .head(campoDoFormulario.value, {
        observe: 'response'
      })
      .pipe(
        map((response: HttpResponseBase) => {
          return response.ok ? null : { urlInvalida: true }
        }),
        catchError((error) => {
          return [{ urlInvalida: true }]
        })
      )
  }

}
