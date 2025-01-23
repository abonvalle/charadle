import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'strToArr',
    standalone: false
})
export class strToArr implements PipeTransform {
  transform(value: any): string[] {
    return value?.split('');
  }
}
