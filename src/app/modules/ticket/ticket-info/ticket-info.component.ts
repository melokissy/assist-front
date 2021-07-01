import { CommonModule, formatDate } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { Historic } from 'src/app/models/historic';
import { Ticket } from 'src/app/models/ticket';
import { User } from 'src/app/models/user';
import { Comment } from 'src/app/models/comment';
import { ProjectService } from 'src/app/services/project.service';
import { AttachmentService } from 'src/app/services/attachment.service';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from 'src/app/services/comment.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { DialogDataComponent } from '../dialog-data/dialog-data.component';
import { DialogDataCommentComponent } from '../dialog-data-comment/dialog-data-comment.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { environment } from 'src/environments/environment';
import { Attachment } from 'src/app/models/attachment';


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
  anexoService: AttachmentService;
  comentarioService: CommentService;
  prioridades: string[];
  bsModalRef: BsModalRef;
  type: any;
  selectedPriority: any;
  userLogado = { name: '', email: '', profile: '', id: '' };
  comments: any = [];
  listHistorico: Historic[];
  ticketSelecionado: Ticket;
  comentarioText: null;
  anexo: Attachment;
  editable = false;
  positionResponsible = 0;
  listProjects: Project[];
  positionProject = 0;
  statusResolvido: boolean = false;
  imagePath;
  imgUrl;


  status : string;

  textAreas: { value: string }[] = [{ value: '' }];

  constructor(
    public ticketService: TicketService,
    private httpClient: HttpClient,
    private roteador: Router,
    private route: ActivatedRoute,
    userService: UserService,
    anexoService: AttachmentService,
    projectService: ProjectService,
    private modalService: BsModalService,
    commentService: CommentService,
    public dialog: MatDialog
  ) {
    this.userService = userService;
    this.anexoService = anexoService;
    this.projectService = projectService;
    this.comentarioService = commentService;
    this.auxTicket = new Ticket();
    this.route.params.subscribe(params => this.ticketId = params['id']);
    this.dialog = dialog;
  }

  ngOnInit(): void {
    this.prioridades = ["Alta", "Media", "Baixa"];

    this.userLogado.id = localStorage.getItem('user-autenticated-idUser');
    this.userLogado.name = localStorage.getItem('user-autenticated-name');
    this.userLogado.email = localStorage.getItem('user-autenticated-email');
    this.userLogado.profile = localStorage.getItem('user-autenticated-profile');


    this.ticketService.getById(this.ticketId).subscribe(data => {
      this.ticket = data;
      if (data.comment) {
        this.comments = data.comment
      }
      this.getRequester(this.ticket.requester.id);
    });

    this.verificaStatus();
  }

  editarTicket(){
    if(this.formTicket.value.responsible == null){
      this.handleAlert('danger', 'Para edição, obrigatório informar responsável');
      return;
    }
    if(this.formTicket.valid){
      if(this.ticketId){
        this.ticketService.updateTicket(this.ticketId, this.formTicket.value, this.userLogado.id).subscribe(
          response => {
            this.handleAlert('success', 'Atualizado com sucesso!');
            this.reloadPage();
            this.createFormGroup(response);
          },
          (responseError: HttpErrorResponse) => {
            this.mensagemErro = responseError.error;
            this.handleAlert('danger', this.mensagemErro);
          }
        );
      }
    }
  }

  setStatus(value:string){
    this.formTicket.patchValue({status: value});
  }

  setPriority(value:string){
    this.formTicket.patchValue({priority: value});
  }

  setType(value:string){
    this.formTicket.patchValue({type: value});
  }

  openDialog() {
    this.listHistorico = this.ticket.historic;
    console.log(this.listHistorico);
    const dialogRef = this.dialog.open(DialogDataComponent, {
      data: { list: this.listHistorico }
    });
  }
  openComments() {
    console.log(this.comments);
    const dialogRef = this.dialog.open(DialogDataCommentComponent, {
      data: { listComments: this.comments }

    });
  }

  uploadAnexo(event, anexo) {
    const files = event.target.files;

    let mimeType = files[0].type;
    if(mimeType.match(/image\/*/) != null){
      let reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files[0]);
      reader.onload = (_event)=>{
        this.imgUrl = reader.result;
      }

    }

    if (files) {
      const foto = files[0];
      const formData = new FormData();
    //   formData.append('anexo', new Blob([JSON.stringify({
    //     foto
    // })], {
    //     type: "application/json"
    // }));

      this.anexoService
        .upload(formData, foto)
        .subscribe(response => console.log("arquivo anexado"));
    }

  }

  salvarComentario() {
    if (this.comentarioText) {
      const usuarioComment = new User(this.userLogado)
      const comentario = new Comment();
      comentario.user = usuarioComment;
      comentario.comment = this.comentarioText;
      comentario.ticket = new Ticket(this.ticket);

      this.comentarioService.novoComentario(comentario).subscribe(
        () => {
          this.handleAlert('success', 'Comentário adicionado!');
          this.reloadPage();
        },

      )
    }
  }

  getRequester(id) {
    this.userService.getById(id).subscribe(requester => {
      this.requester = requester;
      this.ticket.requester = requester;
      this.getResponsibleList(this.ticket.responsible.id);
    })
  }

  getResponsibleList(id) {
    this.userService.userByProfile().subscribe(responsible => {
      this.responsiblesList = responsible;
      if (id == 0 || id == null) {
        this.positionResponsible = 0;
        this.getProject(this.ticket.project.id);
      } else {
        for (let index = 0; index < responsible.length; index++) {
          if (responsible[index].id == id) {
            this.ticket.responsible = responsible[index];
            this.positionResponsible = index;
          }
        }
        this.getProject(this.ticket.project.id);
      }
    }
    )
  }

  getProject(idProject) {
    this.projectService.listar().subscribe(project => {
      this.listProjects = project;
      for (let index = 0; index < project.length; index++) {
        if (project[index].id == idProject) {
          this.ticket.project = project[index];
          this.positionProject = index;
        }
      }
    });
    this.createFormGroup(this.ticket);
  }

  createFormGroup(data: any) {
    return this.formTicket = new FormGroup({
      subject: new FormControl(data.subject, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(data.description, [Validators.required]),
      requester: new FormControl(data.requester),
      responsible: new FormControl(data.responsible),
      type: new FormControl(data.type, [Validators.required]),
      priority: new FormControl(data.priority),
      project: new FormControl(data.project.name, [Validators.required]),
      status: new FormControl(data.status,  [Validators.required])
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

  verificaStatus(){
    if(this.ticket.status == 'Resolvido') {
      this.statusResolvido = true;
      console.log(this.statusResolvido);
    }

  }

  public deleteTicket(id: number) {
    this.ticketService.delete(id);
  }

  public resolverTicket() {
    if (this.ticketId) {
      if (this.ticket.status == 'Resolvido') {
        this.handleAlert('danger', 'Ticket já está resolvido');
      }
      if (this.ticket.status != 'Resolvido') {
        this.ticketService.resolverTicket(this.ticketId, this.ticket).subscribe(ticketResolvido => {
          this.handleAlert('success', 'Ticket resolvido com sucesso!');
          this.reloadPage();
        });
      }
    }
  }

  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  handleAlert(type, message) {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = type;
    this.bsModalRef.content.message = message;
  }



}
