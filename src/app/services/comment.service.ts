import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/internal/operators/map';
import { Comment } from 'src/app/models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  apiUrl = `${environment.apiUrl}comments/`;

  constructor(private http: HttpClient) { }

  // POST /tickets
  novoComentario(comment: Comment) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'})
    }
    return this.http
      .post(this.apiUrl, comment,httpOptions)
      .pipe<Comment>(
        map(
          (response: any) => {
            return response;
          }
        )
      )
  }


}
