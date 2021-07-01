import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Project } from 'src/app/models/project';
import { Ticket } from 'src/app/models/ticket';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/services/project.service';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
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
  userLogado = { name: '', email: '', profile: '', id: '' };
  userService: UserService;
  projectService: ProjectService;
  userList: User[];
  projectList: Project[];
  mensagemErro: any;
  bsModalRef: BsModalRef;

  constructor(
    private httpClient: HttpClient,
    private roteador: Router, private activatedRoute: ActivatedRoute,
    ticketService: TicketService, userService: UserService,
    projectService: ProjectService, private fb: FormBuilder,private modalService: BsModalService) {
    this.ticketService = ticketService;
    this.userService = userService;
    this.projectService = projectService;
    this.createFormNewTicket();
  }

  ngOnInit(): void {
    this.userLogado.id = localStorage.getItem('user-autenticated-idUser');
    this.userLogado.name = localStorage.getItem('user-autenticated-name');
    this.userLogado.email = localStorage.getItem('user-autenticated-email');
    this.userLogado.profile = localStorage.getItem('user-autenticated-profile');

    this.getUsersByProfile();
  }

  createFormNewTicket() {
    return this.formCadastroTicket = new FormGroup({
      subject: new FormControl  ('', [Validators.required]),
      description: new FormControl ('', [Validators.required]),
      requester: new FormControl ('', [Validators.required]),
      type: new FormControl ('', [Validators.required]),
      priority: new FormControl ( '', [Validators.required]),
      project: new FormControl  ('', [Validators.required])
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
      this.ticketService.cadastrarTicket(ticketData, this.userLogado.id ).subscribe(data => {
        this.ticket = data;

        this.formCadastroTicket.reset();
        if(this.ticket != null){
          this.handleAlert('success', 'Ticket cadastrado com sucesso!');

        }
        //após 1 segundo, redireciona para a rota de login
        setTimeout(() => {
          this.roteador.navigate(['/tickets']);
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

  getUsersByProfile(){
    this.userService.listar().subscribe( users => {
      this.userList = users;
      this.getProjects();
    });
  }

  getProjects(){
    this.projectService.listar().subscribe( projects => {
      this.projectList = projects;
      this.createFormNewTicket();
    });
  }

  handleAlert(type, message) {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = type;
    this.bsModalRef.content.message = message;
  }

}
