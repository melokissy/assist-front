import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { ProjectFormService } from 'src/app/services/project-form.service';
import { Observable } from 'rxjs';


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
  projeto: Project;
  projeto2: Observable <Project>;
  constructor(
    private httpClient: HttpClient,
    private roteador: Router) {

  }

  ngOnInit(): void {

      this.createFormGroup(new Project)
 }
  createFormGroup(data: any) {
    return this.formProjeto = new FormGroup({
      name: new FormControl( data.name, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(data.description, [Validators.required]),
      status: new FormControl(data.status, []),
    })
  }

  editarProjeto(project) {
    this.projeto = project;
    this.createFormGroup(project);
    console.log("oque tem aqui nessa porra: ", this.formProjeto.value)
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
