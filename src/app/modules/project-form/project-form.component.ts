import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
  providers:[]
})
export class ProjectFormComponent implements OnInit {
  mensagensErro: any;

  formProjeto = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required]),
    status: new FormControl(false, []),

  })

  constructor( private httpClient: HttpClient,
    private roteador: Router) {
  }

  ngOnInit(): void {
  }

  cadastrarProjeto(){
    if (this.formProjeto.valid) {
      const projectData = new Project(this.formProjeto.value);
      console.log('PROJETO INSERIDO' + projectData.name);
      this.httpClient
        .post('http://localhost:41124/AssistApi/resource/projects', projectData)
        .subscribe(
          () => {
            console.log('Cadastrado com sucesso!');

            this.formProjeto.reset();

            //após 1 segundo, redireciona para a rota de login
            setTimeout(() => {
                this.roteador.navigate(['/projects']);
              }, 100);
            }
            ,(responseError: HttpErrorResponse) => {
              //caso erros
              this.mensagensErro = responseError.error.body;
            }
        )

    }
    else{
      this.validaCampos(this.formProjeto);
    }
  }

  validaCampos(form: FormGroup){
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control.markAsTouched({ onlySelf: true });
    })
  }

}
