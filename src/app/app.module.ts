import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { PagesComponent } from './pages/pages.component';

import { APP_ROUTES } from './app.routes';

import { SharedModule } from './shared/shared.module';
import { ServiceModule } from './service/service.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
