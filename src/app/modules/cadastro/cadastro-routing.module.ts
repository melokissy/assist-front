import { CadastroComponent } from './cadastro.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const rotasCadastro: Routes = [
  { path: '', component: CadastroComponent }
]

@NgModule({
  declarations: [],
  imports: [
    // CommonModule,
    RouterModule.forChild(rotasCadastro)
  ],
  exports: [
    RouterModule
  ]
})
export class CadastroRoutingModule { }
