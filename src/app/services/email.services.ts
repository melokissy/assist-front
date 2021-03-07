import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Email } from '../models/email';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class EmailService {

  // api = 'http://localhost:3200/emails';
  apiUrl = `${environment.apiUrl}emails/`;

  cabecalho = new HttpHeaders({ 'Authorization': localStorage.getItem('assist-token') });

  constructor(private http: HttpClient) { }

  enviar({ destinatario, assunto, conteudo }) {

    const emailParaApi = {
      to: destinatario,
      subject: assunto,
      content: conteudo
    }

    return this.http
      .post(this.apiUrl, emailParaApi, { headers: this.cabecalho })
      .pipe<Email>(
        map(
          (emailApi: any) => {
            return new Email({
              destinatario: emailApi.to,
              assunto: emailApi.subject,
              conteudo: emailApi.content
            })
          }
        )
      )
  }
}