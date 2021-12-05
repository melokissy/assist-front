import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Ticket } from 'src/app/models/ticket';
import { CommentService } from 'src/app/services/comment.service';
import { ProjectService } from 'src/app/services/project.service';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'assist-meus-tickets',
  templateUrl: './meus-tickets.component.html',
  styleUrls: ['./meus-tickets.component.css']
})
export class MeusTicketsComponent implements OnInit {

  userLogado = { name: '', email: '', profile: '', id: '' };
  userService: UserService;
  projectService: ProjectService;
  ticketList: Ticket[];
  mensagemErro: any;
  filteredItems: any[];
  dataCriado: null;

  constructor(
    public ticketService: TicketService,
    private httpClient: HttpClient,
    private roteador: Router,
    private route: ActivatedRoute,
    userService: UserService,
    projectService: ProjectService,
    private modalService: BsModalService,
    public dialog: MatDialog
  ) {
    this.userService = userService;
    this.projectService = projectService;
    this.dialog = dialog;
  }

  ngOnInit(): void {
    this.userLogado.id = localStorage.getItem('user-autenticated-idUser');
    this.userLogado.name = localStorage.getItem('user-autenticated-name');
    this.userLogado.email = localStorage.getItem('user-autenticated-email');
    this.userLogado.profile = localStorage.getItem('user-autenticated-profile');

    this.listarTickets(this.userLogado.id);
  }

  listarTickets(id: string){
    this.ticketService.ticketByUser(id).subscribe(
      lista => {
        this.ticketList = lista;
        this.assignCopy();
      },
      (responseError: HttpErrorResponse) => {
        this.mensagemErro = '';
        if (responseError.status === 400) {
          this.mensagemErro = "email não encontrado"
        }
        else {
          this.mensagemErro = "ocorreu um erro inesperado"
        }
      }
    );
  }

  assignCopy() {
    this.filteredItems = Object.assign([], this.ticketList);
  }

  filterItemData(value) {
    if (!value) {
      this.assignCopy();
    }
    this.filteredItems = Object.assign([], this.ticketList).filter(
      item => item.createdAt.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }


}
