import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[assistFormField]'
})

export class AssistFormFieldDirective implements OnInit {

  constructor(private campo: ElementRef) { }

  ngOnInit() {

    const campo = this.campo.nativeElement;
    console.log(campo.name)
    if (campo.name) {
      campo.id = campo.name;
      campo.setAttribute('placeholder', ' ');
      campo.classList.add('mdl-textfield__input');
    } else {
      throw new Error("Atributo 'name' é obrigatório");
    }

  }
}
