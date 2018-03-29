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
  ) { }

  // CRUD

  // Crud: alta de usuario
  public insertarUsuario( usuarioInsert: Usuario ) {

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

  // buscar usuario por uid
  obtenerUsuario ( uid: string ) {
    let db = firebase.firestore();

    let promesa = new Promise( ( resolve, reject ) => {

      if ( uid !== null && uid !== '' ) {

        db.collection('usuarios').where('uid', '==', uid)
        .get()
        .then((querySnapshot: any) => {
            // no encuentra el usuario en bd
            if ( querySnapshot.empty ) {
              resolve();
            } else {
              resolve( querySnapshot );
            }
        })
        .catch(function(error) {
          reject();
          console.log('Error obteniendo usuario por uid: ', uid);
        });
      } else {
        resolve();
      }

      });
      return promesa;
  }
}
