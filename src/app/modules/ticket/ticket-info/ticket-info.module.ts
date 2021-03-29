import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from 'src/app/services/ticket.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { AssistFormModule } from 'src/app/components/assist-form.module';
import { TicketRoutingModule } from '../ticket-routing.module';
import { TicketInfoComponent } from './ticket-info.component';



@NgModule({
  declarations: [],
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
export class TicketInfoModule { }
