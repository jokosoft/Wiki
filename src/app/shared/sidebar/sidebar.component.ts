import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../service/service.index';
import { Router } from '@angular/router';
import { Usuario } from '../../models/Usuario.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  public usuarioLogin: Usuario = null;


  constructor(
    public _us: UsuariosService,
    public _router: Router
  ) {
      // carga los datos del usuario logado
      this.usuarioLogin = _us.obtenerUsuarioLocalStorage();
  }

  ngOnInit() {
  }

  logOut () {
    this._us.logout()
    .then( () => {
      this._router.navigate(['/login']);
    })
    .catch( (err) => console.log(err) );
  }

}
