import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private roteador: Router) {
      //  this.authenticationService = authenticationService;
  }

  userLogado = {name: '', email: '', profile: ''};

  canActivate(route: ActivatedRouteSnapshot): boolean {
    this.userLogado.profile = localStorage.getItem('user-autenticated-profile');

    const currentUser = localStorage.getItem('');
    if (localStorage.getItem('assist-token')) {
      if (route.data.roles && route.data.roles.indexOf(this.userLogado.profile) === -1) {
        // role not authorised so redirect to home page
        this.roteador.navigate(['/dashboard']);
        return false;
    }
      return true;
    } else {
      this.roteador.navigate([''])
      return false
    }
  }
}
