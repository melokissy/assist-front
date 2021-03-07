import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserRoutingModule } from './edit-user-routing.module';
import { EditUserComponent } from './edit-user.component';
import { AssistFormModule } from './../../components/assist-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentsModule } from '../../components/shared-components.module';



@NgModule({
  declarations: [
    EditUserComponent
  ],
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedComponentsModule,
    AssistFormModule,
    EditUserRoutingModule
  ],
})
export class EditUserModule { }
