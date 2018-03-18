import { URL_FOTO_USUARIO_GENERICO } from '../configuracion/config';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string): string {

    if (!img) {
      return URL_FOTO_USUARIO_GENERICO;
    }

    return img;
  }

}
