import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/Usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }


}
