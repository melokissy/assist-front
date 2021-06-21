import { Component,Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogDataComment } from '../ticket-info/ticket-info.component';
@Component({
  selector: 'assist-dialog-data-comment',
  templateUrl: './dialog-data-comment.component.html',
  styleUrls: ['./dialog-data-comment.component.css'],
})
export class DialogDataCommentComponent{
  constructor(
    public dialogRef: MatDialogRef<DialogDataCommentComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogDataComment
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }

}
