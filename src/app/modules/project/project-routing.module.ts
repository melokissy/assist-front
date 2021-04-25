import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProjectsComponent } from './project.component';
import { ProjectFormComponent } from '../project-form/project-form.component';


const rotasProject: Routes = [
  { path: '', component: ProjectsComponent }
]

@NgModule({
  declarations: [],
  imports: [
  // CommonModule,
    RouterModule.forChild(rotasProject)
  ],
  exports: [
    RouterModule
  ]
})
export class ProjectRoutingModule { }
