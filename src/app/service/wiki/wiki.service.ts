import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Wiki } from '../../models/Wiki.model';

@Injectable()
export class WikiService {

  public itemsCollection: AngularFirestoreCollection<any>;

  constructor(
    private _afs: AngularFirestore
  ) {
      this.itemsCollection = this._afs.collection<Wiki>('wikis');
   }

   public insertar(wiki: Wiki) {
    // return this.itemsCollection.doc(nombreTema).set({nombre: nombreTema});
  }

  public listado(tema: string) {
    return this.itemsCollection.valueChanges()
            .map( (wikis: Wiki[]) => {
                return wikis;
            });
  }

  public eliminar(wiki: Wiki) {
        return this.itemsCollection.doc(wiki._id).delete();
  }
}
