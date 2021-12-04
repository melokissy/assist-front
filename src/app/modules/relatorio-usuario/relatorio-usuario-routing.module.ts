import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RelatorioUsuarioComponent } from './relatorio-usuario.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


const rotasRelatorio: Routes = [
  { path: '', component: RelatorioUsuarioComponent }
]

@NgModule({
  declarations: [],
  imports: [
  // CommonModule,
    RouterModule.forChild(rotasRelatorio)
  ],
  exports: [
    RouterModule
  ]
})
export class RelatorioUsuarioRoutingModule { }
