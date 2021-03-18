import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProjectFormComponent } from './project-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


const rotasProjectForm: Routes = [
  { path: '', component: ProjectFormComponent }
]

@NgModule({
  declarations: [],
  imports: [
  // CommonModule,
    RouterModule.forChild(rotasProjectForm)
  ],
  exports: [
    RouterModule
  ]
})
export class ProjectFormRoutingModule { }
