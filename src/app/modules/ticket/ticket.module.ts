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
import { DialogDataComponent } from './dialog-data/dialog-data.component';
import { DialogDataCommentComponent } from './dialog-data-comment/dialog-data-comment.component';
import { AttachmentService } from 'src/app/services/attachment.service';



@NgModule({
  declarations: [TicketComponent, TicketInfoComponent, CadastroTicketComponent, DialogDataComponent, DialogDataCommentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedComponentsModule,
    AssistFormModule,
    TicketRoutingModule
    ],
  providers: [TicketService, AttachmentService]
})
export class TicketModule { }
