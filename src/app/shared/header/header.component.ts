import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/service.index';
import { Usuario } from '../../models/Usuario.model';
import { Router } from '@angular/router';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  public usuarioLogin: Usuario = new Usuario();

  constructor(
    public _ls: LoginService,
    public _router: Router
  ) {
    // carga los datos del usuario logado
    this.usuarioLogin = _ls.obtenerUsuarioLocalStorage();
  }

  ngOnInit() {
  }

  logOut () {
    this._ls.logout()
    .then( () => {
      this._router.navigate(['/login']);
    })
    .catch( (err) => console.log(err) );
  }

  alertaTest() {
    swal('Alerta de prueba', 'El apartado se encuentra actualmente en desarrollo.', 'success');
    // swal('Alerta de Test', 'Test para mostar alertas en la app', 'success');
    console.log('click');
  }
}
