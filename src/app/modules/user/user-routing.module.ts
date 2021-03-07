import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsersComponent } from './user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


const rotasUser: Routes = [
  { path: '', component: UsersComponent }
]

@NgModule({
  declarations: [],
  imports: [
  // CommonModule,
    RouterModule.forChild(rotasUser)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
