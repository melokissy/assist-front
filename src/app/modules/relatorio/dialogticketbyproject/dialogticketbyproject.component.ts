import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  printComponent(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;

    window.location.reload();
  }

}
