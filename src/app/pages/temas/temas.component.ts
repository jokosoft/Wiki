import { Component, OnInit } from '@angular/core';
import { TemasService } from '../../service/temas/temas.service';

import * as firebase from 'firebase/app';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: any = _swal as any;


@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styles: []
})
export class TemasComponent implements OnInit {

public listadoTemas: string[];
public mostrarDetalle: Boolean = false;

  constructor(
    private _ts: TemasService
  ) {
      this._ts.listado()
        .subscribe( (data) => {
          this.listadoTemas = data;
        });
   }

  ngOnInit() {
  }

  nuevoTema(nombreTema: any) {
    if (nombreTema.value) {
      this._ts.insertar(nombreTema.value)
        .catch( (error) => console.log(error) );

      nombreTema.value = '';
    }
  }

  eliminar(nombreTema: string) {
    swal( {
      title: '¿Está Seguro?',
      text: `Se va a eliminar el tema: ${ nombreTema }`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    } )
    .then( (value: string) => {
      if (value) {
        this._ts.eliminar(nombreTema)
        .catch( (error) => console.log(error) );
      }
    });
  }

}
