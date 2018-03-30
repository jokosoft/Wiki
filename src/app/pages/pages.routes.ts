import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AboutComponent } from './about/about.component';
import { BusquedaGeneralComponent } from './busqueda-general/busqueda-general.component';

import { EsAutorizadoGuard } from '../service/service.index';
import { TemasComponent } from './temas/temas.component';
import { WikiComponent } from './wiki/wiki.component';




const pagesRoutes: Routes = [
    { path: 'inicio', component: InicioComponent,
         data: { titulo: 'Inicio' } },
    { path: 'busquedaGeneral/:termino', component: BusquedaGeneralComponent, data: { titulo: 'Busqueda General' } },
    { path: 'usuarios', component: UsuariosComponent,
                        canActivate: [ EsAutorizadoGuard ],
                        data: { titulo: 'Usuarios' } },
    { path: 'temas', component: TemasComponent, data: { titulo: 'Temas' } },
    { path: 'wiki', component: WikiComponent, data: { titulo: 'Wiki' } },
    { path: 'about', component: AboutComponent, data: { titulo: 'About' } },
    { path: '', redirectTo: '/inicio', pathMatch: 'full' }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
