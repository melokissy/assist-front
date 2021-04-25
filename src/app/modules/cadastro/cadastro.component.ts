import { HttpErrorResponse } from '@angular/common/http';
import { User } from './../../models/user';
import { HttpResponseBase } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map, catchError } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  mensagensErro: any;
  id: number;
  userService: UserService;
  user: User;
  params: any = {};
  formCadastro: FormGroup;

  createFormUser(data) {

    return this.formCadastro = new FormGroup({
      name: new FormControl(data ? data.name : '', [Validators.required, Validators.minLength(3)]),
      email: new FormControl(data ? data.email : '', [Validators.required]),
      password: new FormControl(data ? data.password : ''),
      userIcon: new FormControl(data ? data.userIcon : ''),
      profile: new FormControl(data ? data.profile : ''),
      status: new FormControl(data.status, [])
    })

  }


  constructor(private httpClient: HttpClient,
    private roteador: Router,
    private activatedRoute: ActivatedRoute,
    userService: UserService) {
    this.userService = userService;
  }

  ngOnInit() {
    this.params = this.activatedRoute.params
    this.id = this.params.value.id;
    if (this.params && this.params.value && this.params.value.id) {
      this.userService.getById(this.params.value.id)
        .subscribe(response => {
          this.createFormUser(response);
          this.user = response;
        },
          errorResponse => alert("CLIENTE NÃO EXISTE")
        );
    } else {
      this.createFormUser(new User);
    }
  }

  createUser() {
    const userData = new User(this.formCadastro.value);
    this.httpClient
      .post('http://localhost:41124/AssistApi/resource/users', userData)
      .subscribe(
        () => {
          console.log(`Cadastrado com sucesso`);
          this.formCadastro.reset()

          //após 1 segundo, redireciona para a rota de login
          setTimeout(() => {
            this.roteador.navigate(['/users']);
          }, 100);
        }
        , (responseError: HttpErrorResponse) => {
          //resposta caso existam erros!
          this.mensagensErro = responseError.error.body
          // this.mensagensErro = responseError
        }
      )
  }

  handleCadastrarUsuario() {
    if (this.formCadastro.valid) {
      if (this.id) {
        this.userService.atualizar(this.id, this.formCadastro.value).subscribe(userEdited => {
          this.createFormUser(userEdited);
        });
        //após 1 segundo, redireciona para a rota de login
        setTimeout(() => {
          this.roteador.navigate(['/users']);
        }, 100);
        alert("Usuário atualizado com sucesso");
      } else {
        this.createUser();
      }

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
