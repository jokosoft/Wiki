import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { PipesModule } from '../pipes/pipes.module';

import { InicioComponent } from './inicio/inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AboutComponent } from './about/about.component';
import { PAGES_ROUTES } from './pages.routes';
import { BusquedaGeneralComponent } from './busqueda-general/busqueda-general.component';
import { UsuariosListadoComponent } from './usuarios/listado/usuarios-listado.component';
import { UsuariosBusquedaComponent } from './usuarios/busqueda/usuarios-busqueda.component';
import { UsuariosAltaEdicionComponent } from './usuarios/alta-modificacion/usuarios-alta-edicion.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    PipesModule
  ],
  exports: [

  ],
  declarations: [
    InicioComponent,
    AboutComponent,
    UsuariosComponent,
    BusquedaGeneralComponent,
    UsuariosListadoComponent,
    UsuariosBusquedaComponent,
    UsuariosAltaEdicionComponent]
})
export class PagesModule { }
