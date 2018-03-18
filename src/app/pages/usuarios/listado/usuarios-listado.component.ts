import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../service/usuarios/usuarios.service';
import { Usuario } from '../../../models/Usuario.model';

@Component({
  selector: 'app-usuarios-listado',
  templateUrl: './usuarios-listado.component.html',
  styles: []
})
export class UsuariosListadoComponent implements OnInit {

  public listadoUsuarios: Usuario[];

  constructor(
    public _us: UsuariosService) { }

  ngOnInit() {
    this.cargarListadoUsuarios();
  }

  cargarListadoUsuarios() {
    this._us.buscarUsuarios()
        .subscribe( data => {
          this.listadoUsuarios = data;
        });
  }
}
