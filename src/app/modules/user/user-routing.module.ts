import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsersComponent } from './user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { UserService } from 'src/app/services/user.service';


const rotasUser: Routes = [
  { path: '', component: UsersComponent },

]

@NgModule({
  declarations: [],
  imports: [
  // CommonModule,
    RouterModule.forChild(rotasUser)
  ],
  exports: [
    RouterModule
  ],
  providers: [UserService]

})
export class UserRoutingModule { }
