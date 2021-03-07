import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Alert } from '../models/alert';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { Project } from '../models/project';


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
      id: projectApi.id
    })
  }

  // GET /users/:id
  public get(id: number): Project {
    return this.projects
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

  // PUT /user/:id
  public update(id: number, values: {}) {
    const project = this.get(id);

    if (!project) {
      return null;
    }

    const updatedProject = new Project(values);
    const alert = this.validate(updatedProject, true);

    if (alert.isError()) {
      return alert;
    }

    Object.assign(project, values);
  }

  //DELETE
  public delete(id: number) {
    this.projects = this.projects.filter(project => project.id !== id);
    return this;
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

    if (project.status === '') {
      alert.setMessage('O campo status é obrigatório');
      alert.setError(true);
    }

    return alert;
  }
}
