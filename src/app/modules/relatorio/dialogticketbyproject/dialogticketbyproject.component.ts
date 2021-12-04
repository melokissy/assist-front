import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogRelatorioByProject } from '../relatorio.component';

@Component({
  selector: 'assist-dialogticketbyproject',
  templateUrl: './dialogticketbyproject.component.html',
  styleUrls: ['./dialogticketbyproject.component.css']
})
export class DialogticketbyprojectComponent {

  hoje: number = Date.now();

  constructor(
    public dialogRef: MatDialogRef<DialogticketbyprojectComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogRelatorioByProject
  ) { }
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
