import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProjectFormComponent } from './project-form.component';


const rotasProjectForm: Routes = [
  { path: '', component: ProjectFormComponent },
  { path: ':id', component: ProjectFormComponent }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(rotasProjectForm)
  ],
  exports: [
    RouterModule
  ]
})
export class ProjectFormRoutingModule { }
