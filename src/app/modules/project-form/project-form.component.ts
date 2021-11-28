import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';


@Component({
  selector: 'app-projects',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
  providers: []
})

@Injectable()
export class ProjectFormComponent implements OnInit {

  mensagensErro: any;
  formProjeto: FormGroup;
  id: number;
  userService: UserService;
  projectService: ProjectService;
  projeto: Project;
  projeto2: Observable<Project>;
  params: any = {};
  formCadastro: FormGroup;
  userList: User[];
  responsiblesList: User[];
  responsible: User;
  data: any;
  projectNovo: Project;
  bsModalRef: BsModalRef;
  mensagemErro: any;
  type: any;

  constructor(
    private httpClient: HttpClient,
    private roteador: Router, private activatedRoute: ActivatedRoute,
    projectService: ProjectService, userService: UserService, private modalService: BsModalService) {
    this.projectService = projectService;
    this.userService = userService;
    this.formProjeto = this.createFormProject(new Project);
  }

  ngOnInit(): void {
    this.params = this.activatedRoute.params
    this.id = this.params.value.id;
    if (this.params && this.params.value && this.params.value.id) {
      this.projectService.getById(this.params.value.id)
        .subscribe(response => {
          this.responsiblesList = [response.responsible];
          this.createFormProject(response);
          this.projeto = response;
        },
          errorResponse => alert("PROJETO NÃO EXISTE")
        );
    } else {
      this.getResponsibles();
      this.createFormProject(new Project);
    }
  }

  getResponsibles() {
    this.userService.listar().subscribe(users => {
      this.responsiblesList = users;
    });
  }

  limparUsers(){
    this.userList = [];
  }


  createFormProject(data: any) {
    return this.formProjeto = new FormGroup({
      name: new FormControl(data.name, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(data.description, [Validators.required]),
      status: new FormControl(data.status, []),
      responsible: new FormControl(data.responsible ? data.responsible : this.responsiblesList, [])
    })
  }

  handleCadastrarProjeto() {
    if (this.formProjeto.valid) {
      if (this.id) {
        this.projectService.atualizar(this.id, this.formProjeto.value).subscribe(projectEdited => {
          this.createFormProject(projectEdited);
          this.handleAlert('success', 'Atualizado com sucesso!');
        }
        , (responseError: HttpErrorResponse) => {
          this.mensagemErro = responseError.error;
          this.handleAlert('danger', this.mensagemErro);
        }
        );
        //após 1 segundo, redireciona para a rota de projetos
        setTimeout(() => {
          this.roteador.navigate(['/projects']);
        }, 100);
      } else {
        this.cadastrarProjeto();
      }

    }
    else {
      this.validaCampos(this.formProjeto);
      this.handleAlert('danger','Preencher todos os campos');

    }
  }

  cadastrarProjeto() {
    if (this.formProjeto.valid) {
      const projectData = new Project(this.formProjeto.value);

      this.projectService.cadastrar(projectData).subscribe(data => {
        this.projeto = data;
        this.formProjeto.reset();

        if(this.projeto != null){
          this.handleAlert('success', 'Cadastrado com sucesso!');
        }
        //após 1 segundo, redireciona para a rota de login
        setTimeout(() => {
          this.roteador.navigate(['/projects']);
        }, 100);
      },
      (responseError: HttpErrorResponse) => {
        this.mensagemErro = responseError.error;
        this.handleAlert('danger', this.mensagemErro);
      })
    } else{
      this.handleAlert('danger', 'Preencher campos obrigatórios');
    }
  }


  validaCampos(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control.markAsTouched({ onlySelf: true });
    })
  }

  handleAlert(type, message) {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = type;
    this.bsModalRef.content.message = message;
  }

}
