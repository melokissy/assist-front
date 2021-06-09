import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'assist-alert-modal',
  templateUrl: './alert-modal.component.html',
  styles: [
  ]
})
export class AlertModalComponent implements OnInit {

  @Input() type: 'success';
  @Input() message: String;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  onClose(){
    this.bsModalRef.hide();
  }

}
