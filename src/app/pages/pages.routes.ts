import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AboutComponent } from './about/about.component';
import { BusquedaGeneralComponent } from './busqueda-general/busqueda-general.component';




const pagesRoutes: Routes = [
    { path: 'inicio', component: InicioComponent, data: { titulo: 'Inicio' } },
    { path: 'busquedaGeneral/:termino', component: BusquedaGeneralComponent, data: { titulo: 'Busqueda General' } },
    { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios' } },
    { path: 'about', component: AboutComponent, data: { titulo: 'About' } },
    { path: '', redirectTo: '/inicio', pathMatch: 'full' }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
