import { Component, OnInit, Input } from '@angular/core';
import { Wiki } from '../../../models/Wiki.model';
import { Usuario } from '../../../models/Usuario.model';
import { WikiService } from '../../../service/service.index';

@Component({
  selector: 'app-tarjetas-wiki',
  templateUrl: './tarjetas-wiki.component.html',
  styles: []
})
export class TarjetasWikiComponent implements OnInit {

  @Input() wikis: Wiki[];

  constructor( public _ws: WikiService ) {

   }

  ngOnInit() {
  }

  paginaSiguiente() {
    if (this.wikis && this.wikis.length > 0) {
      let ultimo: number = this.wikis[ this.wikis.length - 1 ].fecha;
      this._ws.siguientePagina( ultimo )
        .subscribe((data: Wiki[]) => {
          if (data && data.length > 0) {
             this.wikis = this.wikis.concat(data);
          }
      });
    }
  }

  paginaInicio() {
    this._ws.busquedaInicial();
    this._ws.listado('')
        .subscribe((data) => {
          this.wikis = data;
        });
  }

}
