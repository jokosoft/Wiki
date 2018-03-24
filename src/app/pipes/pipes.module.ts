import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { BoleanoPipe } from './boleano.pipe';


@NgModule({
  imports: [ ],
  declarations: [
    ImagenPipe,
    BoleanoPipe
  ],
  exports: [
    ImagenPipe,
    BoleanoPipe
  ]
})
export class PipesModule { }

