import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Alert } from '../models/alert';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { Project } from '../models/project';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  // apiUrl = 'http://localhost:41124/AssistApi/resource/users';

  apiUrl = `${environment.apiUrl}projects/`;

  public lastId = 0;

  private projects: Project[] = [];

  constructor(private http: HttpClient) { }

  // GET
  listar() {
    return this.http
      .get(this.apiUrl)
      .pipe<Project[]>(
        map(
          (response: any[]) => {
            return response
              .map(
                projectApi => this.newProject(projectApi)
              )
          }
        )
      )
  }

  newProject(projectApi) {
    return new Project({
      name: projectApi.name,
      description: projectApi.description,
      status: projectApi.status,
      id: projectApi.id,
      createdAt: projectApi.createdAt,
      number: projectApi.number,
      responsible: projectApi.responsible
    })
  }

  // GET /projects/:id
  public get(id: number, projects: any): Project {
    return projects
      .filter(project => project.id === id)
      .pop();
  }

  // POST /projects

  cadastrar(project: Project) {

    return this.http
      .post(this.apiUrl, project)
      .pipe<Project>(
        map(
          (user: any) => {
            return this.newProject(project);
          }
        )
      )
  }


  getById(id: number) : Observable<Project>{
    return this.http.get<Project>(this.apiUrl+`${id}`);
  }

  // getComments(): Observable<Comment>{
  //   return this.http.get<Comment>(this.apiUrl+`${id}`);
  // }


  public atualizar(id: number, project:Project) : Observable<Project>{
    return this.http.put<Project>(this.apiUrl+`${id}`, project);
  }

  //DELETE
  public delete(id: number) {
    this.projects = this.projects.filter(project => project.id !== id);
    return this;
  }

  public deleteProject(id: number){
    return this.http.delete(this.apiUrl+`${id}`).pipe(take(1));
  }

  private validate(project: Project, update = false): Alert {
    const alert = new Alert();
    if (project.name === '') {
      alert.setMessage('O campo nome é obrigatório');
      alert.setError(true);
    }

    if (project.description === '') {
      alert.setMessage('O campo descrição é obrigatório');
      alert.setError(true);
    }

    return alert;
  }
}
