import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { AssistFormModule } from 'src/app/components/assist-form.module';
import {CommentService} from 'src/app/services/comment.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedComponentsModule,
    AssistFormModule
  ],
  providers:[CommentService]
})
export class CommentModule { }
