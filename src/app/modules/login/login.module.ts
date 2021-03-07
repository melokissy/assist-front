import { LoginService } from './../../services/login.services';
import { HttpClientModule } from '@angular/common/http';
import { AssistFormModule } from './../../components/assist-form.module';
import { RouterModule } from '@angular/router';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    RouterModule,
    FormsModule,
    AssistFormModule,
    HttpClientModule
  ],
  exports:[
    RouterModule,
  ],
  providers: [
    LoginService
    ]

})
export class LoginModule { }
