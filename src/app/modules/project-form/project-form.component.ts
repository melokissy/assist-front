import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
  providers:[]
})
export class ProjectFormComponent implements OnInit {

  constructor( private httpClient: HttpClient,
    private roteador: Router) {
  }

  ngOnInit(): void {
  }

}
