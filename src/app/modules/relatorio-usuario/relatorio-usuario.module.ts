import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { AssistFormModule } from 'src/app/components/assist-form.module';
import { RelatorioUsuarioComponent } from './relatorio-usuario.component';
import { RelatorioUsuarioRoutingModule} from './relatorio-usuario-routing.module';
import { RelatorioService } from 'src/app/services/relatorio.service';
import { DialogTicketbyUserComponent } from './dialog-ticketby-user/dialog-ticketby-user.component';



@NgModule({
  declarations: [RelatorioUsuarioComponent, DialogTicketbyUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedComponentsModule,
    AssistFormModule,
    RelatorioUsuarioRoutingModule  ],
    providers: [RelatorioService]
})
export class RelatorioUsuarioModule { }
