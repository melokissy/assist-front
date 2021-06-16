import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { AssistFormModule } from 'src/app/components/assist-form.module';
import { TicketRoutingModule } from '../ticket/ticket-routing.module';
import { TicketService } from 'src/app/services/ticket.service';
import { TicketComponent } from './ticket.component';
import { TicketInfoComponent } from './ticket-info/ticket-info.component';
import { CadastroTicketComponent } from './cadastro-ticket/cadastro-ticket.component';
import { BrowserModule } from '@angular/platform-browser';
import { DialogDataComponent } from './dialog-data/dialog-data.component';



@NgModule({
  declarations: [TicketComponent, TicketInfoComponent, CadastroTicketComponent, DialogDataComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedComponentsModule,
    AssistFormModule,
    TicketRoutingModule
    ],
  providers: [TicketService]
})
export class TicketModule { }
