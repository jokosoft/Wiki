import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/service.index';

declare function init_plugins();

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: []
})
export class InicioComponent implements OnInit {

  public esAutorizado = '...';

  constructor(
    private _ls: LoginService
  ) {

   }

  ngOnInit() {
    init_plugins();

    this._ls.esAutorizado()
    .then ( ( resultado: boolean ) => this.esAutorizado = 'Autorizado ' + resultado );

  }


}
