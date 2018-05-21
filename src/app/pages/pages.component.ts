import {
  Component,
  OnInit,
} from '@angular/core';

declare function init_plugins();

declare function init_Height();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})

export class PagesComponent implements OnInit {

  private bPrimeraEntrada = true;

  constructor() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login');   // remove the class
    body.classList.add('nav-md');   // add the class
   }

  ngOnInit() {
    this.bPrimeraEntrada = false;
    init_plugins();
  }

  onActivate() {
    if (!this.bPrimeraEntrada) {
    init_Height();
    }
  }

}
