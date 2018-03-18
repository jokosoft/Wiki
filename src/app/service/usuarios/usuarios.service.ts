import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, QueryFn } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Usuario } from '../../models/Usuario.model';

@Injectable()
export class UsuariosService {

  private itemsCollection: AngularFirestoreCollection<any>;
  private listadoUsuarios: Usuario[] = [];

  public usuarioLogin: Usuario = new Usuario();

  constructor(
      public _afs: AngularFirestore,
      public _afAuth: AngularFireAuth
  ) {
      this._afAuth.authState.subscribe( user => {

        if ( !user ) {
          console.log('sin usuario registrado');
          return;
        }

        this.usuarioLogin = new Usuario(
          user.uid,
          user.displayName,
          user.email,
          user.photoURL
        );

        // si no existe, lo inserta en bd
        // guarda los daos en local storage
        this.validarUsuario( this.usuarioLogin );

      });

   }

  // listado de usuarios filtrado
  buscarUsuarios( usuarioFiltro?: Usuario ) {

    this.itemsCollection = this._afs.collection<Usuario>('usuarios');
    return this.itemsCollection.valueChanges();

  }

  validarUsuario ( usuarioBuscar: Usuario ) {
    let db = firebase.firestore();
    console.log('uid buscar', usuarioBuscar.uid);
    db.collection('usuarios').where('uid', '==', usuarioBuscar.uid)
    .get()
    .then(function(querySnapshot) {

        console.log(querySnapshot);

        if ( querySnapshot.empty ) {
          // inserta el usuario
          this.insertarUsuario( usuarioBuscar )
                .then(function(docRef) {
                  //  guarda los datos en local storage
                  this.guardarUsuarioLocalStorage ( usuarioBuscar );
                })
                .catch(function(error) {
                    console.error('Error adding document: ', error);
                });
        } else {
          //  guarda los datos en local storage
          this.guardarUsuarioLocalStorage ( usuarioBuscar );
        }

    })
    .catch(function(error) {
        console.log('Error obteniendo usuario: ', error);
    });
  }

  // alta de usuario
  insertarUsuario( usuarioInsert: Usuario ) {
    return this._afs.collection<Usuario>('usuarios')
    .add( usuarioInsert );
  }

  // edicion de usuario
  editarUsuario( usuarioEdit: Usuario ): boolean {
    let bIsOk = false;

    return bIsOk;
  }

  // borrado de usuario
  borrarUsuario( usuarioDelete: Usuario ): boolean {
    let bIsOk = false;

    return bIsOk;
  }


  login() {
    return this._afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.usuarioLogin = null;
    this.eliminarUsuarioLocalStorage();
    return this._afAuth.auth.signOut();
  }

  guardarUsuarioLocalStorage( usuario: Usuario) {
      if ( usuario.uid ) {
        localStorage.setItem('uid', usuario.uid);
        localStorage.setItem('nombre', usuario.nombre);
        localStorage.setItem('email', usuario.email);
        localStorage.setItem('img', usuario.img);
      } else {
        // no hay usuario que guardar
        console.log('No existe usuario logado que guardar en LocalStorage');
      }
  }

  eliminarUsuarioLocalStorage() {
      localStorage.removeItem('uid');
      localStorage.removeItem('nombre');
      localStorage.removeItem('email');
      localStorage.removeItem('img');
  }

  obtenerUsuarioLocalStorage(): Usuario {
    return new Usuario (
      localStorage.getItem('uid'),
      localStorage.getItem('nombre'),
      localStorage.getItem('email'),
      localStorage.getItem('img')
    );
  }
}
