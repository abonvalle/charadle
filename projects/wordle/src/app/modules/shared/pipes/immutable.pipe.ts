import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'immutable',
    pure: false,
    standalone: false
})
export class ImmutablelPipe implements PipeTransform {
  transform(object: any): any {
    const newObj = {};
    return Object.assign(newObj, object);
  }
}
