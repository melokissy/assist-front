import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';


@Component({
  selector: 'assist-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
  providers: []
})

export class TicketComponent implements OnInit {

  auxTicket: Ticket = null;
  ticketList = [];
  mensagemErro: any;

  constructor(public ticketService: TicketService, private httpClient: HttpClient,
    private roteador: Router) {
    this.auxTicket = new Ticket();
  }

  ngOnInit(): void {
    this.tickets();

  }

  tickets(){
    this.ticketService
      .listar()
      .subscribe(
        //next
        lista => {
          this.ticketList = lista;
          console.log(this.ticketList);
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
}
