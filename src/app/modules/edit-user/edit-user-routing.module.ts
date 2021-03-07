import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EditUserComponent } from './edit-user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


const rotasEditUser: Routes = [
  { path: '', component: EditUserComponent }
]

@NgModule({
  declarations: [],
  imports: [
  // CommonModule,
    RouterModule.forChild(rotasEditUser),

  ],
  exports: [
    RouterModule

  ]
})
export class EditUserRoutingModule { }
