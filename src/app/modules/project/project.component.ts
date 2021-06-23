import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from 'src/app/models/project';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { ProjectFormService } from 'src/app/services/project-form.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';



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
  bsModalRef: BsModalRef;
  filteredItems: any[];
  number: any;
  projetoSelecionado: number;
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;


  constructor(public projectService: ProjectService, private httpClient: HttpClient,
    private roteador: Router,projectform: ProjectFormComponent,private modalService: BsModalService) {
    this.auxProj = new Project();
    this.projectform = projectform;
    }

  ngOnInit(): void {
    this.projects();
  }

  getById(idProjeto){
    this.project = this.projectService.get(idProjeto,this.projectList);
  }

  projects(){
    this.projectService
      .listar()
      .subscribe(
        lista => {
          this.projectList = lista;
          console.log(this.projectList + 'lista dos projetos');
          this.assignCopy();
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

  onDelete(id: number) {
    this.projetoSelecionado = id;
    this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
  }

  onConfirmDelete(id: number){
    let projectData = id
    console.log(projectData);

    this.projectService.deleteProject(this.projetoSelecionado).subscribe(
      () => {
        this.deleteModalRef.hide();

        this.handleAlert('success', 'Excluído com sucesso');
        //após 1 segundo, redireciona para a rota de login
        setTimeout(() => {
          this.projects();
        }, 1000);
      }
      , (reponseError: HttpErrorResponse) => {
        this.deleteModalRef.hide();

        this.mensagemErro = reponseError.error;
        this.handleAlert('danger', this.mensagemErro);
      })
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

  onClose(){
    this.bsModalRef.hide();
  }

  handleAlert(type,message){
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = type;
    this.bsModalRef.content.message = message;
  }

  assignCopy() {
    this.filteredItems = Object.assign([], this.projectList);
  }

  filterItem(value) {
    if (!value) {
      this.assignCopy();
    }
    this.filteredItems = Object.assign([], this.projectList).filter(
      item => item.number.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }

}
