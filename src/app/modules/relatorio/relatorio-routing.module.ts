import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RelatorioComponent } from './relatorio.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


const rotasRelatorio: Routes = [
  { path: '', component: RelatorioComponent }
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
export class RelatorioRoutingModule { }
