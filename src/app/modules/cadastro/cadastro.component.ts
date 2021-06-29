import { HttpErrorResponse } from '@angular/common/http';
import { User } from './../../models/user';
import { HttpResponseBase } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map, catchError } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';


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
  bsModalRef: BsModalRef;
  mensagemErro: any;

  createFormUser(data) {
    console.log(this.user.name);

    return this.formCadastro = new FormGroup({
      name: new FormControl(this.user.name ? this.user.name :'', [Validators.required, Validators.minLength(3)]),
      email: new FormControl(data.email, [Validators.required]),
      password: new FormControl(data.password,[Validators.nullValidator]),
      userIcon: new FormControl(data.userIcon),
      profile: new FormControl(data.profile),
      status: new FormControl(data.status , [Validators.nullValidator]),
      cpf: new FormControl(data.cpf, [Validators.required, Validators.minLength(11)]),
      setor: new FormControl(data.setor, [Validators.required])
    })

  }

  constructor(private httpClient: HttpClient,
    private roteador: Router,
    private activatedRoute: ActivatedRoute,
    userService: UserService, private modalService: BsModalService) {
    this.userService = userService;
  }

  ngOnInit() {
    this.params = this.activatedRoute.params
    this.id = this.params.value.id;
    if (this.params && this.params.value && this.params.value.id) {
      this.userService.getById(this.params.value.id)
        .subscribe(response => {
          this.user = response;
          this.createFormUser(response);
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
          this.formCadastro.reset();
          this.handleAlert('success','Cadastrado com sucesso!');

          //após 1 segundo, redireciona para a rota de login
          setTimeout(() => {
            this.roteador.navigate(['/users']);
          }, 100);
        }
        , (responseError: HttpErrorResponse) => {
          //resposta caso existam erros!
          this.mensagemErro = responseError.error;
          this.handleAlert('danger',this.mensagemErro);
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
      } else {
        this.createUser();
      }

    }
    else {
      this.handleAlert('danger','Preencher todos os campos');
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

 onClose(){
    this.bsModalRef.hide();
  }

  handleAlert(type,message){
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = type;
    this.bsModalRef.content.message = message;
  }

}
