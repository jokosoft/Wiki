import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Usuario } from '../../models/Usuario.model';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class LoginService {

  // public usuarioLogin: Usuario;

  constructor(
      public _router: Router,
      private _afAuth: AngularFireAuth,
      private _us: UsuariosService
  ) {
    // this.verificarLogin();
  }

  public login() {
    this._afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then( () => {
              // login correcto, se obtienen los datos del usuario y se registran en local storage
              this.obtenerDatosLoginAuth()
                  .then( usuario => {
                    // si no existe en bd lo inserta
                    this.validarInsertarUsuario(usuario)
                        .then( usuarioBD => {
                          if (usuarioBD) {
                            // guarda los datos del usuario
                            this.guardarUsuarioLocalStorage(usuarioBD);

                            // se redirige a la página de entrada en la app
                            this._router.navigate(['/']);
                          } else {

                            // se monta objeto con los datos del usuario
                            this._us.insertarUsuario( usuario )
                                  .then( (docRef) => {

                                      // guarda los datos del usuario
                                      this.guardarUsuarioLocalStorage(usuario);

                                      // se redirige a la página de entrada en la app
                                      this._router.navigate(['/']);
                                  })
                                  .catch( (error) => {
                                      console.error('Error insertando usuario: ', error);
                                  });
                          }

                        })
                        .catch ( ( error ) => {
                          console.error('1', error);
                          this.errorVuelveLogin( 'Error en autenticación' );
                        });

                  })
                  .catch( ( msj ) => {
                    console.error('2');
                    this.errorVuelveLogin( msj );
                  });

            })
            .catch( (err) => {
              console.error('3');
              this.errorVuelveLogin( 'Error en autenticación' );
            } );
  }

  private obtenerDatosLoginAuth() {

    let usuarioLogin: Usuario;

    // promesa a devolver con el usuario
    let promesa = new Promise( ( resolve, reject ) => {

      // se consulta el estado de la autenticación
      this._afAuth.authState
          .subscribe( user => {

            if ( !user ) {

              // borra los datos de local storage
              this.eliminarUsuarioLocalStorage();
              reject('sin usuario registrado');
            } else {

              // se completa el objeto Usuario con los datos de auth
              usuarioLogin = new Usuario(
                user.uid,
                user.displayName,
                user.email,
                user.photoURL
              );

              // se devuelven los datos del usuario
              resolve( usuarioLogin );
            }

          });
    });
    return promesa;
  }

  private errorVuelveLogin( err: string ) {
    console.log('errorVuelveLogin: ', err);

    // redirige a login
    this._router.navigate(['/login']);
  }

  public esAutorizado() {
    let db = firebase.firestore();
    let uidUsuario = localStorage.getItem('uid');

    let promesa = new Promise( ( resolver, rejectt ) => {

      if ( uidUsuario !== null && uidUsuario !== '' ) {

        this._us.obtenerUsuario (uidUsuario)
        .then((querySnapshot: any) => {
            if (querySnapshot) {

              let doc: Usuario = querySnapshot.docs[0].data();
              if ( doc && doc.auth) {
                resolver (true);
              } else {
                resolver (false);
              }
            } else {
              resolver (false);
            }
        })
        .catch(function(error) {
          rejectt();
          console.log('Error obteniendo usuario para verificación autorizado: ', error);
        });
      } else {
        resolver (false);
      }
    });

    return promesa;
  }


  validarInsertarUsuario ( usuarioBuscar: Usuario ) {

    let db = firebase.firestore();

    let promesa = new Promise( ( resolver, rejectt ) => {
      db.collection('usuarios').where('uid', '==', usuarioBuscar.uid)
      .get()
      .then((querySnapshot) => {
          // no encuentra el usuario en bd
          if ( querySnapshot.empty ) {

            resolver();
          } else {
            // se obtiene el usuario de bd
            let doc: Usuario = querySnapshot.docs[0].data();
            resolver(doc);
          }

      })
      .catch(function(error) {
        rejectt();
        console.log('Error obteniendo usuario: ', error);
      });
    });
    return promesa;

  }


  logout() {
    this.eliminarUsuarioLocalStorage();
    return this._afAuth.auth.signOut();
  }

  guardarUsuarioLocalStorage( usuario: Usuario) {
      if ( usuario.uid ) {
        localStorage.setItem('uid', usuario.uid);
        localStorage.setItem('nombre', usuario.nombre);
        localStorage.setItem('email', usuario.email);
        localStorage.setItem('img', usuario.img);
        localStorage.setItem('xxx', String(usuario.auth));
      } else {
        // no hay usuario que guardar
        console.log('No existe usuario logado que guardar en LocalStorage', usuario);
      }
  }

  eliminarUsuarioLocalStorage() {
      localStorage.removeItem('uid');
      localStorage.removeItem('nombre');
      localStorage.removeItem('email');
      localStorage.removeItem('img');
      localStorage.removeItem('xxx');
  }

  obtenerUsuarioLocalStorage(): Usuario {
    let usuario = new Usuario (
      localStorage.getItem('uid'),
      localStorage.getItem('nombre'),
      localStorage.getItem('email'),
      localStorage.getItem('img'),
      Boolean( localStorage.getItem('xxx') )
    );
    if (usuario.uid === null || usuario.uid === '') {
      usuario = null;
    }

    return usuario;
  }



}
