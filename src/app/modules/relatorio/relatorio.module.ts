import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { AssistFormModule } from 'src/app/components/assist-form.module';
import { ProjectFormRoutingModule } from '../project-form/project-form-routing.module';
import { RelatorioService } from 'src/app/services/relatorio.service';
import { RelatorioComponent } from './relatorio.component';
import { RelatorioRoutingModule } from './relatorio-routing.module';



@NgModule({
  declarations: [RelatorioComponent],
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedComponentsModule,
    AssistFormModule,
    RelatorioRoutingModule
  ],
  providers: [RelatorioService]
})
export class RelatorioModule { }
