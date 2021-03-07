import { EmailService } from './../../services/email.services';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-caixa-de-entrada',
  templateUrl: './caixa-de-entrada.component.html',
  styleUrls: ['./caixa-de-entrada.component.css']
})
export class CaixaDeEntradaComponent implements OnInit {

  mensagemErro: any;

  constructor(private emailService: EmailService) { }

  ngOnInit(): void {
  }

  private _isNewEmailFormOpen = false;
  emailList = [];
  email = {
    destinatario: '',
    assunto: '',
    conteudo: ''
  }
  get isNewEmailFormOpen() {
    return this._isNewEmailFormOpen;
  }
  toggleNewEmailForm() {
    this._isNewEmailFormOpen = !this.isNewEmailFormOpen
  }
  handleNewEmail(formEmail: NgForm) {
    if (formEmail.invalid) return;
    // this.mensagemErro = null;

    this.emailService
      .enviar(this.email)
      .subscribe(
        emailApi => {
          //Fazemos todas as outras operações após o OK da API
          this.emailList.push(emailApi)
          this.email = { destinatario: '', assunto: '', conteudo: '' }
          formEmail.reset();
        }
        ,(responseError: HttpErrorResponse) => this.mensagemErro = responseError.error

      )
  }

  // this.emailList.push(this.email)
  // this.email = {
  //   destinatario: '',
  //   assunto: '',
  //   conteudo: ''
  // }
  // formEmail.reset();


}
