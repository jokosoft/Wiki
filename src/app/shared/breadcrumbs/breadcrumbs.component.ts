import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  constructor(
    public _router: Router
  ) { }

  ngOnInit() {
  }
  buscar( termino: string ) {
    this._router.navigate(['/busquedaGeneral', termino ]);
  }
}
