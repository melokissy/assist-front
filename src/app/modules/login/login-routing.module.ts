import { LoginComponent } from './login.component';
import {Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


const rotasLogin: Routes = [
  { path: '', component: LoginComponent }
]

@NgModule({
  declarations: [],
  imports: [
    // CommonModule,
    RouterModule.forChild(rotasLogin)

  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule { }
