import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssistFormGroupComponent } from './assist-form-group/assist-form-group.component';
import { AssistFormFieldDirective } from './assist-form-group/assist-form-field.directive';



@NgModule({
  declarations: [
    AssistFormGroupComponent,
    AssistFormFieldDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AssistFormGroupComponent,
    AssistFormFieldDirective
  ]
})
export class AssistFormModule { }
