import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TicketComponent } from './ticket.component';
import { TicketInfoComponent } from './ticket-info/ticket-info.component';
import { CadastroTicketComponent } from './cadastro-ticket/cadastro-ticket.component';


const rotasTickets: Routes = [
  { path: '', component: TicketComponent },
  { path: 'ticketInfo/:id', component: TicketInfoComponent },
  { path: 'cadastro-ticket', component: CadastroTicketComponent }

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
