import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styles: []
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
