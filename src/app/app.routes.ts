import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages/pages.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';




const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        component: PagesComponent,
        loadChildren: './pages/pages.module#PagesModule'
    },
    { path: '**', component: PageNotFoundComponent }
];


export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
