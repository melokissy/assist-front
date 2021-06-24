import { Injectable } from '@angular/core';
import { Alert } from '../models/alert';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';
import { Ticket } from '../models/ticket';
import { Observable } from 'rxjs';
import { Counter } from '../models/counter';


@Injectable({
  providedIn: 'root'
})
export class TicketService {

  apiUrl = `${environment.apiUrl}tickets/`;
  apiUrlResolve = `${environment.apiUrl}tickets/ticket-resolve/`;
  apiUrlCadastro = `${environment.apiUrl}tickets`;
  apiUrlpendentes = `${environment.apiUrl}tickets/tickets-pendentes`;
  apiUrlVencidos = `${environment.apiUrl}tickets/tickets-vencidos`;
  apiUrlVencendo = `${environment.apiUrl}tickets/tickets-vencendo`;


  public lastId = 0;

  private tickets: Ticket[] = [];
  counter: Counter;

  constructor(private http: HttpClient) { }

  // GET /tickets
  listar() {
    return this.http
      .get(this.apiUrl)
      .pipe<Ticket[]>(
        map(
          (response: any[]) => {
            return response
              .map(
                ticketApi => this.newTicket(ticketApi)
              )
          }
        )
      )
  }

  newTicket(ticketApi) {
    return new Ticket({
      subject: ticketApi.subject,
      description: ticketApi.email,
      requester: ticketApi.requester,
      type: ticketApi.type,
      priority: ticketApi.priority,
      status: ticketApi.status,
      project: ticketApi.project,
      responsible: ticketApi.responsible,
      createdAt: ticketApi.createdAt,
      editedAt: ticketApi.editedAt,
      closedAt: ticketApi.closedAt,
      dueDate: ticketApi.dueDate,
      id: ticketApi.id,
      number: ticketApi.number
    })
  }

  //PUT
  public updateTicket(id:number,ticket: Ticket) : Observable<Ticket>{
    return this.http.put<Ticket>(this.apiUrl+`${id}`, ticket);
  }

   // PUT /ticket/ticket-resolve/:id
   public resolverTicket(id: number, ticket: Ticket) : Observable<Ticket>{
    return this.http.put<Ticket>(this.apiUrlResolve+`${id}`, ticket);
  }


  // GET /tickets/:id
  public get(id: number, projects: any): Ticket {
    return this.tickets
      .filter(ticket => ticket.id === id)
      .pop();
  }

  getById(id: number) : Observable<Ticket>{
    return this.http.get<Ticket>(this.apiUrl+`${id}`);
  }

  // POST /tickets
  cadastrarTicket(ticket: Ticket) {
    return this.http
      .post(this.apiUrlCadastro, ticket)
      .pipe<Ticket>(
        map(
          (ticket: any) => {
            return this.newTicket(ticket);
          }
        )
      )
  }

  //DELETE
  public delete(id: number) {
    this.tickets = this.tickets.filter(ticket => ticket.id !== id);
    return this;
  }

  // GET
  listarCounter() {
    return this.http
      .get(this.apiUrlpendentes)
      .pipe<Counter[]>(
        map(
          (response: any[]) => {
            return response
              .map(
                counterApi => this.newCounter(counterApi)
              )
          }
        )
      )
  }
  newCounter(counterApi) {
    return new Counter({
      qtdPendente: counterApi.qtdPendentes,
      qtdTotal: counterApi.qtdTotal,
      qtdConcluido: counterApi.qtdConcluidos,
      qtdApropriado: counterApi.qtdApropriados
    })
  }

  // GET /tickets/tickets-vencidos
  listarVencidos() {
    return this.http
      .get(this.apiUrlVencidos)
      .pipe<Ticket[]>(
        map(
          (response: any[]) => {
            return response
              .map(
                ticketApi => this.newTicket(ticketApi)
              )
          }
        )
      )
  }

  // GET /tickets/tickets-vencendo
  listarVencendo() {
    return this.http
      .get(this.apiUrlVencendo)
      .pipe<Ticket[]>(
        map(
          (response: any[]) => {
            return response
              .map(
                ticketApi => this.newTicket(ticketApi)
              )
          }
        )
      )
  }
}
