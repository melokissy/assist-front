import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { ProjectService } from 'src/app/services/project.service';


@Component({
  selector: 'app-projects',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers:[]

})
export class ProjectsComponent implements OnInit {

  public showForm = false;
  auxProj: Project = null;
  projectList = [];
  mensagemErro: any;
  editPress = false;

  constructor(public projectService: ProjectService, private httpClient: HttpClient,
    private roteador: Router) {
    this.auxProj = new Project();
  }

  ngOnInit(): void {
    this.projects();
  }

  projects(){
    this.projectService
      .listar()
      .subscribe(
        lista => {
          this.projectList = lista;
          console.log(this.projectList);
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


}
