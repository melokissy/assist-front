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
  filtroDate: any;
  dataCriado: null;


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
        if(this.filtroDate == undefined || this.filtroDate == null){
          this.assignCopy();
        }else{
          this.filtraTicketData(this.filtroDate);
        }
        const dialogRef = this.dialog.open(DialogTicketbyUserComponent, {
          data: { list: this.filteredItems, nameUser: userName }
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
        }
      )
  }

  assignCopy() {
    this.filteredItems = Object.assign([], this.listTickets);
  }

  filterItemData(value) {
    this.filtroDate = value;
  }

  filtraTicketData(value){
    if (!value) {
      this.assignCopy();
    }
    this.filteredItems = Object.assign([], this.listTickets).filter(
      item => item.createdAt.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }

}
