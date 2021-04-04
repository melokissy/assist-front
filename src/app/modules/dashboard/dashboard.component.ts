import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { Counter } from 'src/app/models/counter';

@Component({
  selector: 'assist-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: []
})

export class DashboardComponent implements OnInit {
  ticketsList: Ticket[];
  mensagemErro: any;
  counter: Counter ;
  ticketsVencidos: Ticket[];
  ticketsVencendo: Ticket[];

  constructor(public ticketService: TicketService, private httpClient: HttpClient,
    private roteador: Router) {
    }

  ngOnInit(): void {
    this.ticketsDashboard();

  }

  ticketsDashboard() {
    this.ticketService.listar()
    .subscribe(
      args => {
        this.ticketsList = args;
        this.ticketService.listarCounter()
        .subscribe(counterData => {
          this.counter = counterData[0];
          this.ticketService.listarVencidos()
            .subscribe(data => {
              this.ticketsVencidos = data;
              this.ticketService.listarVencendo()
              .subscribe( vencendo => {
                this.ticketsVencendo = vencendo;
              })
            })
    });
  })}
}
