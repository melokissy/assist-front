export class Email {

  destinatario = '';
  assunto = '';
  conteudo = '';
  
  constructor(
    { destinatario, assunto, conteudo }:
      { destinatario: string, assunto: string, conteudo: string }
  ) {
    this.destinatario = destinatario;
    this.assunto = assunto;
    this.conteudo = conteudo;
  }
}