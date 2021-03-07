import { CaixaDeEntradaComponent } from './caixa-de-entrada.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const rotasCaixaDeEntrada: Routes = [
  { path: '', component: CaixaDeEntradaComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(rotasCaixaDeEntrada)
  ],
  exports: [
    RouterModule
  ]
})
export class CaixaDeEntradaRoutingModule { }
