import { CommonModule, formatDate } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { Historic } from 'src/app/models/historic';
import { Ticket } from 'src/app/models/ticket';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/services/project.service';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';
import {CommentService} from 'src/app/services/comment.service';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { DialogDataComponent } from '../dialog-data/dialog-data.component';
import { DialogDataCommentComponent } from '../dialog-data-comment/dialog-data-comment.component';

export interface DialogData {
  list: Historic[];
}
export interface DialogDataComment {
  listComments: any[];
}

@Component({
  selector: 'assist-ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.css'],
  providers: [MatDialog, Overlay]

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
  responsible: User;
  project: Project;
  userList: User[];
  responsiblesList: User[];
  projectService: ProjectService;
  comentarioService: CommentService;
  projectList: Project[];
  prioridades: string[];
  selectedPriority :any;
  userLogado = {name: '', email: '', profile: ''};
  comments: any = [];
  comentario:Comment;
  listHistorico: Historic[];

  textAreas: { value: string }[] = [{value: ''}];


  constructor(
    public ticketService: TicketService,
    private httpClient: HttpClient,
    private roteador: Router,
    private route: ActivatedRoute,
    userService: UserService,
    projectService: ProjectService,
    commentService:CommentService,public dialog: MatDialog    ) {
      this.userService = userService;
      this.projectService = projectService;
      this.comentarioService = commentService;
      this.auxTicket = new Ticket();
      this.route.params.subscribe(params => this.ticketId = params['id']);
      this.dialog = dialog;
    }

  ngOnInit(): void {
    this.prioridades =  ["Alta","Media","Baixa"];

    this.userLogado.name = localStorage.getItem('user-autenticated-name');
    this.userLogado.email = localStorage.getItem('user-autenticated-email');
    this.userLogado.profile = localStorage.getItem('user-autenticated-profile');


    this.ticketService.getById(this.ticketId).subscribe(data => {
      this.ticket = data;
      if(data.comment){
        this.comments = data.comment
        for(let post of this.comments){
          this.addTextArea(post.createdAt + " " + post.user.name +"\n" + post.comment );
        }
      }
      this.getRequester(this.ticket.requester.id);
    });
  }


  openDialog() {
    this.listHistorico = this.ticket.historic;
    console.log(this.listHistorico);
    const dialogRef = this.dialog.open(DialogDataComponent,{
      data:{list: this.listHistorico}
    });
  }
  openComments() {
    console.log(this.comments);
    const dialogRef = this.dialog.open(DialogDataCommentComponent,{
      data:{listComments: this.comments}
    });
  }

  addTextArea(comment) {
    const textArea = { value: comment };
    this.textAreas.push(textArea)
  }


  salvarComentario(comment){
    // this.comentario.user.email = this.userLogado.email;
    // this.comentario.comment = comment;
    // this.comentario.ticket = this.ticket;
    // this

  }

  getRequester(id){
    this.userService.getById(id).subscribe(requester => {
      this.requester = requester;
      this.ticket.requester = requester;
      this.getResponsible(this.ticket.responsible.id);
    })
  }

  getResponsible(id){
    if(id == 0 || id == null){
      this.getResponsibleList();
    }
    this.userService.getById(id).subscribe(responsible => {
      this.responsible = responsible;
      this.ticket.responsible = responsible;
      this.getProject(this.ticket.project.id);
    })
  }

  getResponsibleList(){
    this.userService.userByProfile().subscribe(responsible => {
      this.responsiblesList = responsible;
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
      responsible: new FormControl(this.responsiblesList),
      type: new FormControl(data.type, [Validators.required]),
      priority: new FormControl( data.priority),
      project: new FormControl(data.project.name, [Validators.required]),
      comment: new FormControl(data.comment)
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
          this.formTicket.reset();
          alert('Ticket fechado com sucesso');

        });
      }
    }
}
