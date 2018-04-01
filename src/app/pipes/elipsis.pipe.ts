import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'elipsis'
})
export class ElipsisPipe implements PipeTransform {

  transform(value: string, max: number): any {
    let res = value.substring(0, max) + ' ...';

    return res;
  }

}
