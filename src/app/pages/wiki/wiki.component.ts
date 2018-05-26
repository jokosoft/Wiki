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
    this.usuarioLogin = _ls.obtenerUsuarioLocalStorage();
   }

  ngOnInit() {

    // carga el listado de temas
    this._ts.listado()
      .subscribe( data => {
        this.temas = data;
        this.registroInicial = 'Selecciona un tema para la Wiki';
      } );

      // Carga listado wikis
      this.cargarListado();
  }

  guardarWiki(forma) {
    // se obtinen los datos del formulario
    let insertWiki: Wiki = forma.value;

    // se añden los datos del usurio que inserta la nueva wiki
    insertWiki.usuario = this.usuarioLogin.nombre;
    insertWiki.urlfotoUsuario = this.usuarioLogin.img;

    this._ws.insertar(insertWiki);
    this.wiki = new Wiki;
    // recarga el listado, reiniciendo la posible paginacion
    // this.cargarListado();
  }

  // Carga listado wikis
  cargarListado() {
    this._ws.listado('')
        .subscribe((data) => {
          this.wikis = data;
        });
  }

}
