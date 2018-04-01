import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styles: []
})
export class WysiwygComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
