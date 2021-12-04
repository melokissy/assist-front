import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Ticket } from 'src/app/models/ticket';
import { User } from 'src/app/models/user';
import { RelatorioService } from 'src/app/services/relatorio.service';
import { UserService } from 'src/app/services/user.service';
import { DialogTicketbyUserComponent } from './dialog-ticketby-user/dialog-ticketby-user.component';

export interface DialogRelatorioByUser {
  list: Ticket[];
  nameUser: string;
}

@Component({
  selector: 'assist-relatorio-usuario',
  templateUrl: './relatorio-usuario.component.html',
  styleUrls: ['./relatorio-usuario.css'],
  providers: []
})
export class RelatorioUsuarioComponent implements OnInit {

  auxUser: User = null;
  userList = [];
  filteredItems: any[];
  name: null;
  relatorioService: RelatorioService;
  listTickets: Ticket[];


  constructor(public userService: UserService, private httpClient: HttpClient,public dialog: MatDialog,relatorioService: RelatorioService,
    private roteador: Router, private modalService: BsModalService) {
    this.auxUser = new User();
    this.relatorioService = relatorioService;
    this.dialog = dialog;
  }

  ngOnInit(): void {
    this.users();

  }

  openDialog(userId, userName) {
    this.relatorioService.ticketByUser(userId).subscribe(
      listaTickets => {
        this.listTickets = listaTickets;
        const dialogRef = this.dialog.open(DialogTicketbyUserComponent, {
          data: { list: this.listTickets, nameUser: userName }
        });
      }
    );

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
        }
      )
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

}
