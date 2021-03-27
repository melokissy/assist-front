import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { AssistFormModule } from 'src/app/components/assist-form.module';
import { TicketRoutingModule } from '../ticket/ticket-routing.module';
import { TicketService } from 'src/app/services/ticket.service';
import { TicketComponent } from './ticket.component';



@NgModule({
  declarations: [TicketComponent],
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedComponentsModule,
    AssistFormModule,
    TicketRoutingModule
  ],
  providers: [TicketService]
})
export class TicketModule { }
