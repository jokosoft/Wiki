import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// angularFire2
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { PipesModule } from '../pipes/pipes.module';

import {
  LoginService,
  SharedService,
  UsuariosService
} from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PipesModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
  ],
  providers: [
    LoginService,
    SharedService,
    UsuariosService
  ],
  declarations: []
})
export class ServiceModule { }
