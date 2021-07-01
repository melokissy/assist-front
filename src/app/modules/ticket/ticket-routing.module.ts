import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TicketComponent } from './ticket.component';
import { TicketInfoComponent } from './ticket-info/ticket-info.component';
import { CadastroTicketComponent } from './cadastro-ticket/cadastro-ticket.component';
import { MeusTicketsComponent } from './meus-tickets/meus-tickets.component';


const rotasTickets: Routes = [
  { path: '', component: TicketComponent },
  { path: 'ticketInfo/:id', component: TicketInfoComponent },
  { path: 'cadastro-ticket', component: CadastroTicketComponent },
  { path: 'meus-tickets', component: MeusTicketsComponent }

]

@NgModule({
  declarations: [],
  imports: [
  // CommonModule,
    RouterModule.forChild(rotasTickets)
  ],
  exports: [
    RouterModule
  ]
})
export class TicketRoutingModule { }
