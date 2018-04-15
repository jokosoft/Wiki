import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Wiki } from '../../models/Wiki.model';
import { LIMITE_RESULTADOS_WIKIS } from '../../configuracion/config';

@Injectable()
export class WikiService {

  public itemsCollection: AngularFirestoreCollection<any>;
  private wikis_pagina: Wiki[];

  constructor(
    private _afs: AngularFirestore
  ) {
      this.busquedaInicial();
   }

   public insertar(wiki: Wiki) {
     let insertWiki: Wiki = new Wiki();
     insertWiki = wiki;
     insertWiki.fecha = new Date().getTime(); // hora del equipo
     insertWiki.usuario = 'Joko';
    this.itemsCollection.add(insertWiki);
  }

public busquedaInicial() {
  this.itemsCollection = this._afs.collection<Wiki>('wikis', ref => ref.orderBy('fecha', 'desc')
                                                                            .limit(LIMITE_RESULTADOS_WIKIS));
}

  public listado(tema: string) {
    return this.itemsCollection.valueChanges()
            .map( (wikis: Wiki[]) => {
              if (wikis.length > 0) {
                this.wikis_pagina = wikis;
              }
              return wikis;

            });
  }

  public siguientePagina(ultimo: number) {
    // if (this.wikis_pagina && this.wikis_pagina.length > 0) {
      this.itemsCollection = this._afs.collection<Wiki>('wikis', ref => ref.orderBy('fecha', 'desc')
                                                                          .limit(LIMITE_RESULTADOS_WIKIS)
                                                                          .startAfter(ultimo));
    // }
    return this.listado('');
  }

  public eliminar(wiki: Wiki) {
        return this.itemsCollection.doc(wiki._id).delete();
  }
}
