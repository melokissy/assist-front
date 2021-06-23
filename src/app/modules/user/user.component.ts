import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';


@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: []
})
export class UsersComponent implements OnInit {

  public showForm = false;
  auxUser: User = null;
  userList = [];
  mensagemErro: any;
  editPress = false;
  bsModalRef: BsModalRef;
  filteredItems: any[];
  name: null;
  email: any;
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;
  usuarioSelecionado: number;

  constructor(public userService: UserService, private httpClient: HttpClient,
    private roteador: Router, private modalService: BsModalService) {
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
          this.assignCopy();
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

  onDelete(id: number) {
    this.usuarioSelecionado = id;
    this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
  }

  onConfirmDelete() {
    this.userService.deleteUser(this.usuarioSelecionado).subscribe(
      () => {
        this.deleteModalRef.hide();

        this.handleAlert('success', 'Excluído com sucesso');
        //após 1 segundo, redireciona para a rota de login
        setTimeout(() => {
          this.users();
        }, 1000);
      }
      , (reponseError: HttpErrorResponse) => {
        this.deleteModalRef.hide();

        this.mensagemErro = reponseError.error;
        this.handleAlert('danger', this.mensagemErro);
      })
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
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

  onClose() {
    this.bsModalRef.hide();
  }

  handleAlert(type, message) {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = type;
    this.bsModalRef.content.message = message;
  }

  assignCopy() {
    this.filteredItems = Object.assign([], this.userList);
  }

  filterItem(value) {
    if (!value) {
      this.assignCopy();
    }
    this.filteredItems = Object.assign([], this.userList).filter(
      item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }

  filterItemEmail(value) {
    if (!value) {
      this.assignCopy();
    }
    this.filteredItems = Object.assign([], this.userList).filter(
      item => item.email.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }

}
