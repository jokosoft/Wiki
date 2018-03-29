import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../service/login/login.service';
import { Usuario } from '../models/Usuario.model';


@Injectable()
export class EsAutorizadoGuard implements CanActivate {

  constructor(
    private _ls: LoginService,
    private _rout: Router
  ) { }

  canActivate() {
    let user: Usuario = this._ls.obtenerUsuarioLocalStorage();
    if ( user ) {
      console.log('usuario que llega al guard', user);
      if ( user.auth ) {
        console.log('guard true', user.auth);
        return true;
      } else {
        console.log('guard false', user.auth);
        return false;
      }
    } else {
      // si no hay usuario, directamente a inicio
      return false;
    }
  }
}
