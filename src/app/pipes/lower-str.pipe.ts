import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'lowerStr'
})
export class LowerStrPipe implements PipeTransform {

  transform(value: string): string {
    // let payMode=value.replaceAll('_',' ')
    return value.replace('_', ' ').toLowerCase().split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

}
