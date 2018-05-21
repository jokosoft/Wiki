import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/service.index';
import { URL_JOKOSOFT } from '../configuracion/config';
import { Usuario } from '../models/Usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  public urlJokosoft = URL_JOKOSOFT;
  public usuarioLogin: Usuario;

  constructor(
    public _router: Router,
    public _ls: LoginService
  ) {

    // establece las clases adecuadas para la página de login
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('nav-md');   // remove the class
    body.classList.add('login');   // add the class

  }

  ngOnInit() {

    // se intenta obtener los datos del usuario de local storage, carga null si no existen aun
    this.usuarioLogin = this._ls.obtenerUsuarioLocalStorage();
  }

  login() {
    this._ls.login();
  }

  logOut() {
    this._ls.logout();
  }

}
