import { Component, OnInit } from '@angular/core';
import { Wiki } from '../../models/Wiki.model';
import { TemasService, WikiService } from '../../service/service.index';

declare function init_plugins();

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styles: []
})
export class WikiComponent implements OnInit {

public wiki: Wiki;
public wikis: Wiki[];
public temas: string[];
public registroInicial = 'Cargando Temas...';

  constructor(
    public _ts: TemasService,
    public _ws: WikiService
  ) {
    // inicia el modelo
    this.wiki = new Wiki();
   }

  ngOnInit() {
    init_plugins();

    // carga el listado de temas
    this._ts.listado()
      .subscribe( data => {
        this.temas = data;
        this.registroInicial = 'Selecciona un tema para la Wiki';
      } );

      // test:  carga listado wikis
      this._ws.listado('')
        .subscribe((data) => {
          this.wikis = data;
        });
  }

  guardarWiki(forma) {
      console.log(forma.value);
  }

}
