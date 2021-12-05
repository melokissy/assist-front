import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { Ticket } from 'src/app/models/ticket';
import { ProjectService } from 'src/app/services/project.service';
import { RelatorioService } from 'src/app/services/relatorio.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { DialogticketbyprojectComponent } from './dialogticketbyproject/dialogticketbyproject.component';


export interface DialogRelatorioByProject {
  list: Ticket[];
  nameProject: string;
}

@Component({
  selector: 'assist-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css'],
  providers: []
})
export class RelatorioComponent implements OnInit {

  projectService: ProjectService;
  projectList: any[];
  listTickets: Ticket[];
  listTicketsUser: Ticket[];
  relatorioService: RelatorioService;
  filteredItems: any[];
  dataCriado: null;

  constructor(private httpClient: HttpClient,   public dialog: MatDialog, projectService: ProjectService,relatorioService: RelatorioService,
    private roteador: Router) {
      this.projectService = projectService;
      this.relatorioService = relatorioService;
      this.dialog = dialog;

  }

  ngOnInit(): void {
    this.listarProjects();
  }

  openDialog(projectId, projectName) {
    this.relatorioService.ticketByProject(projectId).subscribe(
      listaTickets => {
        this.listTickets = listaTickets;
        if(this.filtroDate == undefined || this.filtroDate == null){
          this.assignCopy();
        }else{
          this.filtraTicketData(this.filtroDate);
        }
        const dialogRef = this.dialog.open(DialogticketbyprojectComponent, {
          data: { list: this.filteredItems, nameProject: projectName }
        });
      }
    );

  }

  projects(){
    this.projectService
      .listar()
      .subscribe(
        lista => {
          this.projectList = lista;
          console.log(this.projectList + 'lista dos projetos');
        },
      )
  }

  listarProjects(){
    this.projects();
  }

  assignCopy() {
    this.filteredItems = Object.assign([], this.listTickets);
  }

  filtroDate: any;

  filterItemData(value) {
    this.filtroDate = value;
  }

  filtraTicketData(value){
    if (!value) {
      this.assignCopy();
    }
    this.filteredItems = Object.assign([], this.listTickets).filter(
      item => item.createdAt.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }

}
