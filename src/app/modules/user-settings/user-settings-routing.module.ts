import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserSettingsComponent } from '../user-settings/user-settings.component';

const rotasUser: Routes = [
  { path: ':id', component: UserSettingsComponent }

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
  providers: []

})
export class UserSettingsRoutingModule { }
