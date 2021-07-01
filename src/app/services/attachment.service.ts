import { Injectable } from '@angular/core';
import { HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Attachment } from 'src/app/models/attachment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {
  apiUrlAnexo = `${environment.apiUrl}anexos`;

  constructor(private http: HttpClient) { }

  upload( formData: FormData, foto: any) : Observable<any>{

     var blob = new Blob ([JSON.stringify (foto)], {type: "application / json"})
    formData.append ('anexo', blob);

    // const req = new HttpRequest('POST',  this.apiUrlAnexo, formData, {
    //   reportProgress: true,
    //   responseType: 'text'
    // });
    // return this.http.request(req);

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': '*',
        'Access-Control-Expose-Headers': 'x-access-token',
        'Content-Type': 'application/json; multipart/form-data',
        'enctype': 'application/json; multipart/form-data',
        'Authorization': 'Bearer ' +  localStorage.getItem('assist-token')})
    }
    return this.http.post(`${this.apiUrlAnexo}`,formData, httpOptions);
  }
}
