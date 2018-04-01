import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { BoleanoPipe } from './boleano.pipe';
import { ElipsisPipe } from './elipsis.pipe';


@NgModule({
  imports: [ ],
  declarations: [
    ImagenPipe,
    BoleanoPipe,
    ElipsisPipe
  ],
  exports: [
    ImagenPipe,
    BoleanoPipe,
    ElipsisPipe
  ]
})
export class PipesModule { }

