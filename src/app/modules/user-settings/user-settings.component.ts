import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

@Component({
  selector: 'assist-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']

})
export class UserSettingsComponent implements OnInit {

  userService: UserService;
  id: number;
  userLogado = {idUser: '', name: '', email: '', profile: ''};
  formEditUser: FormGroup;
  bsModalRef: BsModalRef;
  mensagemErro: any;
  params: any = {};
  user: User;

  constructor(private httpClient: HttpClient,
    private roteador: Router,
    private activatedRoute: ActivatedRoute,
    userService: UserService, private modalService: BsModalService) {
    this.userService = userService;
  }

  ngOnInit(): void {
    this.userLogado.idUser = localStorage.getItem('user-autenticated-idUser');
    this.userLogado.name = localStorage.getItem('user-autenticated-name');
    this.userLogado.email = localStorage.getItem('user-autenticated-email');
    this.userLogado.profile = localStorage.getItem('user-autenticated-profile');

    this.params = this.activatedRoute.params
    this.userLogado.idUser = this.params.value.id;
    if (this.params && this.params.value && this.params.value.id) {
      this.userService.getById(this.params.value.id)
        .subscribe(response => {
          this.user = response;
          this.createFormUser(response);
        },
          errorResponse => this.handleAlert('danger','Usuário não existe!'),
        );
    } else {
      this.createFormUser(new User);
    }

  }

  createFormUser(data) {
    return this.formEditUser = new FormGroup({
      name: new FormControl(data.name, [Validators.minLength(3)]),
      email: new FormControl(data.email, [Validators.required]),
      password: new FormControl(data.password,[Validators.nullValidator]),
      userIcon: new FormControl(data.userIcon),
      profile: new FormControl(data.profile),
      status: new FormControl(data.status , [Validators.nullValidator]),
      cpf: new FormControl(data.cpf, [Validators.required, Validators.minLength(11)]),
      setor: new FormControl(data.setor, [Validators.required])
    })

  }

  handleCadastrarUsuario() {
    if (this.formEditUser.valid) {
      if (this.id) {
        this.userService.atualizar(this.id, this.formEditUser.value).subscribe(userEdited => {
          this.createFormUser(userEdited);
          this.handleAlert('success','Cadastrado atualizado com sucesso!');

        });
        //após 1 segundo, redireciona para a rota de login
        setTimeout(() => {
          this.roteador.navigate(['/dashboard']);
        }, 100);
      }
    }
    else {
      this.handleAlert('danger','Preencher todos os campos');
    }
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
