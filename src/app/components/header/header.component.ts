import { Component, OnInit } from '@angular/core'
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
  userLogado = {name: '', email: '', profile: ''};
  currentUser: User;

//   constructor(
//     private authenticationService: LoginService
// ) {
//     this.currentUser = this.authenticationService.currentUserValue;
// }
  ngOnInit(): void {
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

}
