import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'assist-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css'],
  providers: []
})
export class RelatorioComponent implements OnInit {

  constructor(private httpClient: HttpClient,
    private roteador: Router) {
 }

  ngOnInit(): void {
  }

}
