import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TicketComponent } from './ticket.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


const rotasTickets: Routes = [
  { path: '', component: TicketComponent }
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
