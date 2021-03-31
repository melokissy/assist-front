import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'assist-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: []
})

export class DashboardComponent implements OnInit {
  ticketsList: Ticket[];
  mensagemErro: any;

  constructor(public ticketService: TicketService, private httpClient: HttpClient,
    private roteador: Router) {
    }

  ngOnInit(): void {
    this.ticketsDaschboard();
  }

  ticketsDaschboard() {
    this.ticketService.listar().subscribe(args => this.ticketsList = args);
  }

}
