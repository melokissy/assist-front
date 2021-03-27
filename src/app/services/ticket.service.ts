import { Injectable } from '@angular/core';
import { Alert } from '../models/alert';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';
import { Ticket } from '../models/ticket';


@Injectable({
  providedIn: 'root'
})
export class TicketService {

  apiUrl = `${environment.apiUrl}tickets/`;

  public lastId = 0;

  private tickets: Ticket[] = [];

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
      project_id: ticketApi.project_id,
      responsible: ticketApi.responsible,
      createdAt: ticketApi.createdAt,
      editedAt: ticketApi.editedAt,
      closeAt: ticketApi.closeAt,
      dueDate: ticketApi.dueDate,
      id: ticketApi.id
    })
  }

    // GET /tickets/:id
    public get(id: number, projects: any): Ticket {
      return this.tickets
        .filter(ticket => ticket.id === id)
        .pop();
    }

}
