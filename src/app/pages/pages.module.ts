import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { InicioComponent } from './inicio/inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AboutComponent } from './about/about.component';
import { PAGES_ROUTES } from './pages.routes';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule
  ],
  exports: [

  ],
  declarations: [
    InicioComponent,
    AboutComponent,
    UsuariosComponent]
})
export class PagesModule { }
