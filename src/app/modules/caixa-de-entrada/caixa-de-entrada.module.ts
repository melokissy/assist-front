import { HttpClientModule } from '@angular/common/http';
import { EmailService } from './../../services/email.services';
import { CaixaDeEntradaRoutingModule } from './caixa-de-entrada-routing.module';
import { FormsModule } from '@angular/forms';
import { CaixaDeEntradaComponent } from './caixa-de-entrada.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../../components/shared-components.module';


@NgModule({
  declarations: [CaixaDeEntradaComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedComponentsModule,
    CaixaDeEntradaRoutingModule,
    HttpClientModule
  ],
  providers:
    [
      EmailService
    ]
})
export class CaixaDeEntradaModule { }
