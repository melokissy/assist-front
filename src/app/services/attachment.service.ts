import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Attachment } from 'src/app/models/attachment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {
  apiUrlAnexo = `${environment.apiUrl}anexos`;

  constructor(private http: HttpClient) { }

  upload(id: number, formData: FormData) : Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post(`${this.apiUrlAnexo}`,formData, httpOptions);
  }
}
