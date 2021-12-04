import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  apiUrl = `${environment.apiUrl}reports/ticket-by-project/`;
  apiUrlByUser = `${environment.apiUrl}tickets/ticket-by-user/`;

  constructor(private http: HttpClient) { }

  ticketByProject(projectId: number)  : Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl+`${projectId}`);
  }

  ticketByUser(idUser: string)  : Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrlByUser+`${idUser}`);
 }

}
