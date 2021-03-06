import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { ProjectFormService } from 'src/app/services/project-form.service';


@Component({
  selector: 'app-projects',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers:[ProjectFormComponent]

})
export class ProjectsComponent implements OnInit {

  public showForm = false;
  auxProj: Project = null;
  projectList = [];
  mensagemErro: any;
  editPress = false;
  projectform:  ProjectFormComponent;
  project = new Project;

  constructor(public projectService: ProjectService, private httpClient: HttpClient,
    private roteador: Router,projectform: ProjectFormComponent) {
    this.auxProj = new Project();
    this.projectform = projectform;
    }

  ngOnInit(): void {
    this.projects();
  }


  getById(idProjeto){
    this.project = this.projectService.get(idProjeto,this.projectList);
    this.projectform.editarProjeto(this.project);

  }

  projects(){
    this.projectService
      .listar()
      .subscribe(
        lista => {
          this.projectList = lista;
          console.log(this.projectList + 'lista dos projetos');
        },
        (responseError: HttpErrorResponse) => {
          this.mensagemErro = '';
          if (responseError.status === 400){
            this.mensagemErro = "email não encontrado"
          }
          else{
            this.mensagemErro = "ocorreu um erro inesperado"
          }
        }
      )
  }

  deleteProject(id: number){
    let projectData = id
    console.log(projectData);

    this.httpClient
    .delete('http://localhost:41124/AssistApi/resource/projects/' + projectData)
    .subscribe(
      () => {
        console.log('deletado com sucesso');

        //redirciona apos 1 s
         setTimeout(() => {
           this.projects();
         }, 100);
      }
      , (reponseError: HttpErrorResponse) => {
        this.mensagemErro = reponseError.error.body
      }
    )
  }
}
