import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TicketInfoComponent } from '../ticket/ticket-info/ticket-info.component';

const rotasDashboard: Routes = [
  {path: '', component: DashboardComponent },
  { path: 'ticketInfo/:id', component: TicketInfoComponent }

]

@NgModule({
  declarations: [],
  imports: [
    // CommonModule,
    RouterModule.forChild(rotasDashboard)
  ],
  exports:[
    RouterModule
  ]
})
export class DashboardRoutingModule { }
