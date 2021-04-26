import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';


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
  projectService: ProjectService;
  projeto: Project;
  projeto2: Observable <Project>;
  params: any = {};
  formCadastro: FormGroup;

  constructor(
    private httpClient: HttpClient,
    private roteador: Router, private activatedRoute: ActivatedRoute,
    projectService: ProjectService) {
      this.projectService = projectService;
  }

  ngOnInit(): void {
    this.params = this.activatedRoute.params
    this.id = this.params.value.id;
    if (this.params && this.params.value && this.params.value.id) {
      this.projectService.getById(this.params.value.id)
        .subscribe(response => {
          this.createFormGroup(response);
          this.projeto = response;
        },
          errorResponse => alert("PROJETO NÃO EXISTE")
        );
    } else {
      this.createFormGroup(new Project);
    }
 }
  createFormGroup(data: any) {
    return this.formProjeto = new FormGroup({
      name: new FormControl( data.name, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(data.description, [Validators.required]),
      status: new FormControl(data.status, []),
    })
  }
  handleCadastrarProjeto(){
    if (this.formProjeto.valid) {
      if (this.id) {
        this.projectService.atualizar(this.id, this.formProjeto.value).subscribe(projectEdited => {
          this.createFormGroup(projectEdited);
        });
        //após 1 segundo, redireciona para a rota de projetos
        setTimeout(() => {
          this.roteador.navigate(['/projects']);
        }, 100);
        alert("Projeto atualizado com sucesso");
      } else {
        this.cadastrarProjeto();
      }

    }
    else {
      this.validaCampos(this.formProjeto);
    }
  }

  cadastrarProjeto() {
    if (this.formProjeto.valid) {
      const projectData = new Project(this.formProjeto.value);
      console.log('PROJETO INSERIDO' + projectData.name);
      this.httpClient
        .post('http://localhost:41124/AssistApi/resource/projects', projectData)
        .subscribe(
          () => {
            console.log('Cadastrado com sucesso!');
            alert("Cadastrado com sucesso!");

            this.formProjeto.reset();

            //após 1 segundo, redireciona para a rota de login
            setTimeout(() => {
              this.roteador.navigate(['/projects']);
            }, 100);

          }
          , (responseError: HttpErrorResponse) => {
            //caso erros
            this.mensagensErro = responseError.error.body;
          }
        )

    }
    else {
      this.validaCampos(this.formProjeto);
    }
  }


  validaCampos(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control.markAsTouched({ onlySelf: true });
    })
  }

}
