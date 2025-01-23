import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mapToArr', pure: false,
    standalone: false
})
export class mapToArr implements PipeTransform {
  transform<T extends unknown>(value: Map<unknown, T>): T[] {
    return Array.from(value?.values());
  }
}
