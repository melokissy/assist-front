import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommentComponent } from './modules/comment/comment.component';
import { SharedModule } from './shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DialogDataModule } from './modules/ticket/dialog-data/dialog-data.module';
import { DialogDataCommentModule } from './modules/ticket/dialog-data-comment/dialog-data-comment.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    SharedModule,
    MatDialogModule,
    CommonModule,
    DialogDataModule,
    DialogDataCommentModule

  ],
  entryComponents:[MatDialogModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
