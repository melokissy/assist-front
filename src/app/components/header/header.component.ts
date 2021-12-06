import { Component, OnInit } from '@angular/core'
import dialogPolyfill from 'dialog-polyfill';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.services';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'assist-header',
  templateUrl: './header.component.html',
  styleUrls: [
    'header.component.css',
    './header-search.css'
  ]
})
export class HeaderComponent implements OnInit{

  private _isMenuOpen = false
  paginaAtual: String;
  userLogado = {idUser: '', name: '', email: '', profile: ''};
  currentUser: User;
  relatorioclicked = false;
  relatorioLink = false;

  ngOnInit(): void {
    this.userLogado.idUser = localStorage.getItem('user-autenticated-idUser');
    this.userLogado.name = localStorage.getItem('user-autenticated-name');
    this.userLogado.email = localStorage.getItem('user-autenticated-email');
    this.userLogado.profile = localStorage.getItem('user-autenticated-profile');
  }


  get isMenuOpen() {
    return this._isMenuOpen
  }

  toggleMenu() {
    this._isMenuOpen = !this.isMenuOpen
  }

  logout(){
    localStorage.clear();
  }
  showSubmenu(){
    if(this.relatorioclicked == true && this.relatorioLink == false){
      this.relatorioclicked = false;
      return;
    }else if(this.relatorioclicked == false &&  this.relatorioLink == false){
      this.relatorioclicked = true;
      return;
    }else if( this.relatorioLink == true){
      this.relatorioLink = false;
      return;
    }
  }
  notToggleSubmenu(){
    this.relatorioLink = true;
  }


}
