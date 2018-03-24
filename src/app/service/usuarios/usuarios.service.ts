import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase/app';

import { Usuario } from '../../models/Usuario.model';

@Injectable()
export class UsuariosService {

  private itemsCollection: AngularFirestoreCollection<any>;
  private listadoUsuarios: Usuario[] = [];

  public usuarioLogin: Usuario = new Usuario();

  constructor(
      private _afs: AngularFirestore
  ) {}

  // CRUD

  // Crud: alta de usuario
  public insertarUsuario( usuarioInsert: Usuario ) {
    console.log('entra a insertar usuario', usuarioInsert);
    return this._afs.collection<Usuario>('usuarios')
    .add( { uid: usuarioInsert.uid,
            nombre: usuarioInsert.nombre,
            img: usuarioInsert.img,
            email: usuarioInsert.email,
            auth: false } );
  }

  // cRud listado de usuarios filtrado
  buscarUsuarios( usuarioFiltro?: Usuario ) {

    this.itemsCollection = this._afs.collection<Usuario>('usuarios');
    return this.itemsCollection.valueChanges();

  }

  // crUd: edicion de usuario
  editarUsuario( usuarioEdit: Usuario ): boolean {
    let bIsOk = false;

    return bIsOk;
  }

  // cruD: borrado de usuario
  borrarUsuario( usuarioDelete: Usuario ): boolean {
    let bIsOk = false;

    return bIsOk;
  }

}
