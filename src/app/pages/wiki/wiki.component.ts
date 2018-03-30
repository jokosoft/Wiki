import { Component, OnInit } from '@angular/core';
import { Wiki } from '../../models/Wiki.model';
import { TemasService } from '../../service/service.index';

declare function init_plugins();

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styles: []
})
export class WikiComponent implements OnInit {

public wiki: Wiki;
public temas: string[];
public registroInicial = 'Cargando Temas...';

  constructor(
    public _ts: TemasService
  ) {
    this.wiki = new Wiki();
    this._ts.listado()
      .subscribe( data => {
        this.temas = data;
        this.registroInicial = 'Selecciona un tema para la Wiki';
      } );
   }

  ngOnInit() {
    init_plugins();
  }

  guardarWiki(forma) {
      console.log(forma);
  }

}
