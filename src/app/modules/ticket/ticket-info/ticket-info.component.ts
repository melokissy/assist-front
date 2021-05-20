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
  selector: 'assist-ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.css'],
  providers: []

})
export class TicketInfoComponent implements OnInit {

  public showForm = false;
  formTicket: FormGroup;
  ticket: Ticket;
  auxTicket: Ticket = null;
  ticketList = [];
  mensagemErro: any;
  editPress = false;
  ticketId: number;
  userService: UserService;
  requester: User;
  project: Project;
  userList: User[];
  projectService: ProjectService;
  projectList: Project[];
  prioridades: string[];
  selectedPriority :any;

  constructor(
    public ticketService: TicketService,
    private httpClient: HttpClient,
    private roteador: Router,
    private route: ActivatedRoute,
    userService: UserService,
    projectService: ProjectService
    ) {
      this.userService = userService;
      this.projectService = projectService;
      this.auxTicket = new Ticket();
      this.route.params.subscribe(params => this.ticketId = params['id'])
    }

  ngOnInit(): void {
    this.prioridades =  ["Alta","Media","Baixa"];
    // this.prioridades =  [ {value:"Alta", id:"Alta"},{value:"Alta", id:"Alta"},{value:"Alta", id:"Alta"}];

    this.ticketService.getById(this.ticketId).subscribe(data => {
      this.ticket = data;
      this.getRequester(this.ticket.requester.id);
    });
  }

  getRequester(id){
    this.userService.getById(id).subscribe(requester => {
      this.requester = requester;
      this.ticket.requester = requester;
      this.getProject(this.ticket.project.id);
    })
  }

  getProject(idProject){
    this.projectService.getById(idProject).subscribe(project => {
      this.project = project;
      this.ticket.project = project;
      this.createFormGroup(this.ticket);
    });
  }


  createFormGroup(data: any) {
    return this.formTicket = new FormGroup({
      subject: new FormControl( data.subject, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(data.description, [Validators.required]),
      requester: new FormControl(this.userList),
      type: new FormControl(data.type, [Validators.required]),
      priority: new FormControl( data.priority),
      project: new FormControl(data.project.name, [Validators.required])
    })
  }


  public editTicket(id: number, subject: string, description: string, project: Project) {
    Object.assign(this.auxTicket, this.ticketService.get(id, project));
    this.auxTicket.id = id;
    this.auxTicket.subject = subject;
    this.auxTicket.description = description;
    console.log("this.auxTicket", this.auxTicket);

    this.editPress = true;

    }

    public deleteTicket(id: number) {
      this.ticketService.delete(id);
    }

    public resolverTicket(){
      if(this.ticketId){
        this.ticketService.resolverTicket(this.ticketId, this.ticket).subscribe(ticketResolvido => {
          this.createFormGroup(ticketResolvido);
          alert('Ticket fechado com sucesso');

        });
      }
    }
}
