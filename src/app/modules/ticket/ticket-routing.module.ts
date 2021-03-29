import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TicketComponent } from './ticket.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TicketInfoComponent } from './ticket-info/ticket-info.component';


const rotasTickets: Routes = [
  { path: '', component: TicketComponent },
  { path: 'ticketInfo', component: TicketInfoComponent }
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
