import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { HttpClientModule } from '@angular/common/http';
import { AssistFormModule } from 'src/app/components/assist-form.module';
import { UserSettingsRoutingModule } from './user-settings-routing.module';
import { UserSettingsComponent } from './user-settings.component';



@NgModule({
  declarations: [UserSettingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedComponentsModule,
    AssistFormModule,
    UserSettingsRoutingModule,
  ],
  exports: [UserSettingsComponent],
})
export class UserSettingsModule { }
