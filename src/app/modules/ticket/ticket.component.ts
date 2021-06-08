import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


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
  filteredItems : any[];
  number: null;
  requester: null;
  status: null;

  constructor(public ticketService: TicketService, private httpClient: HttpClient,
    private roteador: Router) {
    this.auxTicket = new Ticket();
  }

  ngOnInit(): void {
    this.tickets();
  }

  tickets() {
    this.ticketService
      .listar()
      .subscribe(
        //next
        lista => {
          this.ticketList = lista;
          console.log(this.ticketList);
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

  assignCopy(){
    this.filteredItems = Object.assign([], this.ticketList);
 }

 filterItem(value){
  if(!value){
      this.assignCopy();
  }
  this.filteredItems = Object.assign([], this.ticketList).filter(
     item => item.number.toLowerCase().indexOf(value.toLowerCase()) > -1
  )
}

filterItemUser(value){
  if(!value){
      this.assignCopy();
  }
  this.filteredItems = Object.assign([], this.ticketList).filter(
     item => item.requester.name.toLowerCase().indexOf(value.toLowerCase()) > -1
  )
}

filterItemStatus(value){
  if(!value){
      this.assignCopy();
  }
  this.filteredItems = Object.assign([], this.ticketList).filter(
     item => item.status.toLowerCase().indexOf(value.toLowerCase()) > -1
  )
}

}
