import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProjectsComponent } from './project.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


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
