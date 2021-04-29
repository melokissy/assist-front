import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    projectService: ProjectService) {
    this.ticketService = ticketService;
    this.userService = userService;
    this.projectService = projectService;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  createFormGroup(data: any) {
    return this.formCadastroTicket = new FormGroup({
      subject: new FormControl( data.subject, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(data.description, [Validators.required]),
      requester: new FormControl(this.userList),
      type: new FormControl(data.type, [Validators.required]),
      priority: new FormControl(data.priority, [Validators.required]),
      project_id: new FormControl(data.project_id, [Validators.required])
    })
  }
  get subject(): any {
    return this.formCadastroTicket.get('subject');
  }
  setValue() {
    this.formCadastroTicket.setValue({first: 'Carson', last: 'Drew'});
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

  getUsers(){
    this.userService.listar().subscribe( users => {
      this.userList = users;
      this.getProjects();
    });
  }

  getProjects(){
    this.projectService.listar().subscribe( projects => {
      this.projectList = projects;
      this.createFormGroup(new Ticket);
    });
  }

}
