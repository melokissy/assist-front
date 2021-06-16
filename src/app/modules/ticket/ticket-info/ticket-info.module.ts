import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from 'src/app/services/ticket.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { AssistFormModule } from 'src/app/components/assist-form.module';
import { TicketRoutingModule } from '../ticket-routing.module';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { TicketInfoComponent } from './ticket-info.component';
import { OverlayModule } from '@angular/cdk/overlay';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedComponentsModule,
    AssistFormModule,
    TicketRoutingModule,
    MatDialogModule,
    OverlayModule
    ],
  providers: [TicketService, {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  entryComponents: [
    TicketInfoComponent
  ],
})
export class TicketInfoModule { }
