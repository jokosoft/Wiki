import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login');   // remove the class
    body.classList.add('nav-md');   // add the class
   }

  ngOnInit() {
  }

}
