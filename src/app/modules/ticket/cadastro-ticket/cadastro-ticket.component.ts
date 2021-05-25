import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { Ticket } from 'src/app/models/ticket';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/services/project.service';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';
import { TicketComponent } from '../ticket.component';

@Component({
  selector: 'assist-cadastro-ticket',
  templateUrl: './cadastro-ticket.component.html',
  styleUrls: ['./cadastro-ticket.component.css'],
  providers: []
})
export class CadastroTicketComponent implements OnInit {

  formCadastroTicket: FormGroup;
  ticketService: TicketService;
  ticket: Ticket;
  mensagensErro: any;
  userService: UserService;
  projectService: ProjectService;
  userList: User[];
  projectList: Project[];

  constructor(
    private httpClient: HttpClient,
    private roteador: Router, private activatedRoute: ActivatedRoute,
    ticketService: TicketService, userService: UserService,
    projectService: ProjectService, private fb: FormBuilder) {
    this.ticketService = ticketService;
    this.userService = userService;
    this.projectService = projectService;
    this.createFormGroup();
  }

  ngOnInit(): void {
    this.getUsersByProfile();
  }

  createFormGroup() {
    return this.formCadastroTicket = this.fb.group({
      subject:  [ '', [Validators.required]],
      description:  ['', [Validators.required]],
      requester:  this.fb.group({
        name:  ['', [Validators.required]],
        email:  ['', [Validators.required]],
        cpf:  ['', [Validators.required, Validators.minLength(11)]],
        setor: ['', [Validators.required]]
      }),
      type:  ['', [Validators.required]],
      priority:  ['', [Validators.required]],
      project:  ['', [Validators.required]]
    })
  }
  get subject(): any {
    return this.formCadastroTicket.get('subject');
  }

  limparUsers(){
    this.userList = [];
  }

  cadastrarTicket() {
    if (this.formCadastroTicket.valid) {
      const ticketData = new Ticket(this.formCadastroTicket.value);
      console.log("TICKET INSERIDO:" + ticketData.subject);
      this.ticketService.cadastrarTicket(ticketData).subscribe(data => {
        this.ticket = data;

        this.formCadastroTicket.reset();
        if(this.ticket != null){
          alert('CADASTRADO COM SUCESSO');

        }
        //após 1 segundo, redireciona para a rota de login
        setTimeout(() => {
          this.roteador.navigate(['/tickets']);
        }, 100);
      }
      , (responseError: HttpErrorResponse) => {
        //caso erros
        this.mensagensErro = responseError.error.body;
      })
    } else{
      alert('PREENCHER CAMPOS OBRIGATÓRIOS');
    }
  }

  getUsersByProfile(){
    this.userService.userByProfile().subscribe( users => {
      this.userList = users;
      this.getProjects();
    });
  }

  getProjects(){
    this.projectService.listar().subscribe( projects => {
      this.projectList = projects;
      this.createFormGroup();
    });
  }

}
