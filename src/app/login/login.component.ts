import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../service/service.index';
import { URL_JOKOSOFT } from '../configuracion/config';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

public urlJokosoft = URL_JOKOSOFT;

  constructor(
    public _router: Router,
    public _us: UsuariosService
  ) {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('nav-md');   // remove the class
    body.classList.add('login');   // add the class

  }

  ngOnInit() {
    init_plugins();
  }

  login() {
    this._us.login()
    .then( () => {
      this._router.navigate(['/inicio']);
    })
    .catch( (err) => console.log(err) );
  }

  logOut() {
    this._us.logout();
  }

}
