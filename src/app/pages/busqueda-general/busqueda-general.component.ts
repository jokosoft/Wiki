import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-busqueda-general',
  templateUrl: './busqueda-general.component.html',
  styles: []
})
export class BusquedaGeneralComponent implements OnInit {

public resultadoBusqueda: string;

  constructor(
    public _ar: ActivatedRoute
  ) {
      // se recupera de url el termino de búsqueda
      _ar.params
        .subscribe( params => {
          this.buscar( params['termino'] );
        });
   }

  ngOnInit() {
    init_plugins();
  }

  buscar( termino: string ) {
    if (termino !== '') {
      this.resultadoBusqueda = termino;
    } else {
      this.resultadoBusqueda = 'No existe un término para la búsqueda';

    }

  }

}
