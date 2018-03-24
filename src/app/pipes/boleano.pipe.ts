import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boleano'
})
export class BoleanoPipe implements PipeTransform {

  transform(value: boolean): string {
    if (value) {
      return 'Si';
    } else {
      return 'No';
    }
  }

}
