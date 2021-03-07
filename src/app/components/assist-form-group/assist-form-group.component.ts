import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'assist-form-group',
  templateUrl: './assist-form-group.component.html',
  styles: [
  ]
})
export class AssistFormGroupComponent implements OnInit {

  textoDaLabel = '';
  idCampo = '';
  email = '';
  senha = '';
  @Input() campo = new FormControl();

  constructor(private elemento: ElementRef) { }

  ngOnInit(){
    const campo = this.elemento.nativeElement.querySelector('input')
    this.textoDaLabel = campo.name.replace(campo.name[0], campo.name[0].toUpperCase());
    this.idCampo = campo.name;
    this.email = campo.email;
    this.senha = campo.senha;
  }

}
