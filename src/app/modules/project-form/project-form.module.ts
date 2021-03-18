import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectFormComponent } from './project-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProjectFormService } from 'src/app/services/project-form.service';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { AssistFormModule } from 'src/app/components/assist-form.module';
import { ProjectFormRoutingModule } from './project-form-routing.module';


@NgModule({
  declarations: [ProjectFormComponent],
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedComponentsModule,
    AssistFormModule,
    ProjectFormRoutingModule,
  ],
  providers: [ProjectFormService]
})
export class ProjectFormModule { }
