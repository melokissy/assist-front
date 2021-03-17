import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';


@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers:[]
})
export class UsersComponent implements OnInit {

  public showForm = false;
  auxUser: User = null;
  userList = [];
  mensagemErro: any;
  editPress = false;

  constructor(public userService: UserService, private httpClient: HttpClient,
    private roteador: Router) {
    this.auxUser = new User();
  }

  ngOnInit() {
    this.users();
  }

  users() {
    this.userService
      .listar()
      .subscribe(
        //next
        lista => {
          this.userList = lista;
          console.log(this.userList);
        },
        //error
        (responseError: HttpErrorResponse) => {
          this.mensagemErro = '';
          if (responseError.status === 400) {
            this.mensagemErro = "email não encontrado"
          }
          else {
            this.mensagemErro = "ocorreu um erro inesperado"
          }
        }
      )
  }

  handleDeleteUsuario(id: number) {
    let userData = id
    console.log(userData);
    this.httpClient
      .delete('http://localhost:41124/AssistApi/resource/users/' + userData)
      .subscribe(
        () => {
          console.log(`delete com sucesso`);

          //após 1 segundo, redireciona para a rota de login
          setTimeout(() => {
            this.users();
          }, 1000);
        }
        , (responseError: HttpErrorResponse) => {
          //resposta caso existam erros!
          this.mensagemErro = responseError.error.body
          // this.mensagensErro = responseError
        }
      )
  }

  public editUser(id: number, name: string, email: string) {
    Object.assign(this.auxUser, this.userService.get(id));
    this.auxUser.id = id;
    this.auxUser.name = name;
    this.auxUser.email = email;
    console.log("this.auxUser", this.auxUser);

    this.editPress = true;
    this.toggleShowForm();
  }

  public deleteUser(id: number) {
    this.userService.delete(id);
  }

  public toggleShowForm() {
    this.showForm = !this.showForm;
  }

  public cancel() {
    this.auxUser = new User();
    this.toggleShowForm();
  }
}
