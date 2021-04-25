import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AssistFormModule } from '../../../components/assist-form.module';
import { SharedComponentsModule } from '../../../components/shared-components.module';
import { TicketService } from 'src/app/services/ticket.service';
import { TicketRoutingModule } from '../ticket-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedComponentsModule,
    AssistFormModule,
    TicketRoutingModule
  ],
  providers: [TicketService],

})
export class CadastroTicketModule { }
