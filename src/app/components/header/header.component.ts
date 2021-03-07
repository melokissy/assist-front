import { Component } from '@angular/core'

@Component({
  selector: 'assist-header',
  templateUrl: './header.component.html',
  styleUrls: [
    'header.component.css',
    './header-search.css'
  ]
})
export class HeaderComponent {
  private _isMenuOpen = false
  paginaAtual: String;

  get isMenuOpen() {
    return this._isMenuOpen
  }

  toggleMenu() {
    this._isMenuOpen = !this.isMenuOpen
  }

}
