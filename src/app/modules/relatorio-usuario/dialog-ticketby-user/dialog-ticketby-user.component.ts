import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogRelatorioByUser } from '../relatorio-usuario.component';

@Component({
  selector: 'assist-dialog-ticketby-user',
  templateUrl: './dialog-ticketby-user.component.html',
  styles: [
  ]
})
export class DialogTicketbyUserComponent {

  hoje: number = Date.now();

  constructor(public dialogRef: MatDialogRef<DialogTicketbyUserComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogRelatorioByUser) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  printComponent(cmpName) {

    let w = window.open();
    w.document.write(document.getElementById(cmpName).innerHTML);
    w.print();
    w.close();

    window.location.reload();
  }
}
