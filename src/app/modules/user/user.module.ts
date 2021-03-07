import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './user.component';

import { UserRoutingModule } from './user-routing.module';
import { AssistFormModule } from './../../components/assist-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentsModule } from '../../components/shared-components.module';
import { UserService } from 'src/app/services/user.service';
import { HeaderComponent } from '../../components/header/header.component';



@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedComponentsModule,
    AssistFormModule,
    UserRoutingModule,
  ],
  providers: [UserService]
})
export class UserModule { }
