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
                            console.log('despues de validar insertar usuario, EXISTE', usuarioBD);
                            // guarda los datos del usuario
                            this.guardarUsuarioLocalStorage(usuario);

                            // se redirige a la página de entrada en la app
                            this._router.navigate(['/']);
                          } else {
                            console.log('despues de validar insertar usuario NOO EXISTE', usuarioBD);
                            // se monta objeto con los datos del usuario
                            console.log('insertar elusuario', usuario);
                            this._us.insertarUsuario( usuario )
                                  .then( (docRef) => {
                                      console.log('usuario insertado: ', docRef);
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
/*// inserta el usuario
            // this._us.insertarUsuario( usuarioBuscar )
            //       .then( (docRef) => {
            //           console.error('usuario insertado: ', docRef);
            //           resolver(docRef);
            //       })
            //       .catch( (error) => {
            //           console.error('Error insertando usuario: ', error);
            //           rejectt();
            //       }); */
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


  validarInsertarUsuario ( usuarioBuscar: Usuario ) {

    let db = firebase.firestore();

    let promesa = new Promise( ( resolver, rejectt ) => {
      db.collection('usuarios').where('uid', '==', usuarioBuscar.uid)
      .get()
      .then((querySnapshot) => {
          // no encuentra el usuario en bd
          if ( querySnapshot.empty ) {
            console.log('validarInsertarUsuario', 'No encontrado en bd', usuarioBuscar.uid);
            resolver();
          } else {
            console.log('validarInsertarUsuario', 'Encontrado en bd');
            resolver(usuarioBuscar);
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
  }

  obtenerUsuarioLocalStorage(): Usuario {
    let usuario = new Usuario (
      localStorage.getItem('uid'),
      localStorage.getItem('nombre'),
      localStorage.getItem('email'),
      localStorage.getItem('img')
    );

    if (usuario.uid === null || usuario.uid === '') {
      usuario = null;
    }

    return usuario;
  }



}
