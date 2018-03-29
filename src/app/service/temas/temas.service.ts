import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class TemasService {

  public itemsCollection: AngularFirestoreCollection<any>;

  constructor(
    private _afs: AngularFirestore
  ) {
    this.itemsCollection = this._afs.collection<any>('temas');
  }

  public insertar(nombreTema: string) {
    return this.itemsCollection.doc(nombreTema).set({nombre: nombreTema});
  }

  public listado() {
    this.itemsCollection = this._afs.collection<any>('temas');
    return this.itemsCollection.valueChanges()
            .map( (data: any) => {
                let temas: string[] = [];
                for (let tema of data) {
                  temas.push(tema.nombre);
                }
                return temas;
            });
  }

  public eliminar(nombreTema: string) {
        return this.itemsCollection.doc(nombreTema).delete();
  }

}
