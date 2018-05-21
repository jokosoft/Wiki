import { Component, OnInit } from '@angular/core';
import { Wiki } from '../../models/Wiki.model';
import { TemasService, WikiService, LoginService } from '../../service/service.index';
import { Usuario } from '../../models/Usuario.model';

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
public usuarioLogin: Usuario = null;

  constructor(
    public _ts: TemasService,
    public _ws: WikiService,
    public _ls: LoginService
  ) {
    // inicia el modelo
    this.wiki = new Wiki();

    // carga los datos del usuario logado
    this.usuarioLogin = _ls.obtenerUsuarioLocalStorage()
   }

  ngOnInit() {

    // carga el listado de temas
    this._ts.listado()
      .subscribe( data => {
        this.temas = data;
        this.registroInicial = 'Selecciona un tema para la Wiki';
      } );

      // Carga listado wikis
      this._ws.listado('')
        .subscribe((data) => {
          this.wikis = data;
        });
  }

  paginaSiguiente() {
    if (this.wikis && this.wikis.length > 0) {
      let ultimo: number = this.wikis[ this.wikis.length - 1 ].fecha;
      this._ws.siguientePagina( ultimo )
        .subscribe((data: Wiki[]) => {
          if (data && data.length > 0) {
             this.wikis = this.wikis.concat(data);
            // this.wikis = data;
          }
      });
    }
  }

  paginaInicio() {
    this._ws.busquedaInicial();
    this._ws.listado('')
        .subscribe((data) => {
          this.wikis = data;
        });
  }

  guardarWiki(forma) {
    this._ws.insertar(forma.value);
    this.wiki = new Wiki;
    this.paginaInicio();
  }

}
