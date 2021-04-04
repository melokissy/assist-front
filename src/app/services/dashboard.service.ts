import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Counter } from '../models/counter';
import { map } from 'rxjs/internal/operators/map';
import { TicketService } from './ticket.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiUrl = `${environment.apiUrl}tickets/tickets-pendentes`;
  private counter: Counter;

  constructor(private http: HttpClient) { }
}
