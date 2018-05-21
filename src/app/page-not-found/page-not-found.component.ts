import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styles: []
})
export class PageNotFoundComponent implements OnInit {

  constructor() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login');   // remove the class
    body.classList.add('nav-md');   // add the class
  }

  ngOnInit() {
  }

}
