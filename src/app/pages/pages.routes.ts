import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AboutComponent } from './about/about.component';




const pagesRoutes: Routes = [
    { path: 'inicio', component: InicioComponent, data: { titulo: 'ProgressBars' } },
    { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Gráficas' } },
    { path: 'about', component: AboutComponent, data: { titulo: 'Promesas' } },
    { path: '', redirectTo: '/inicio', pathMatch: 'full' }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
