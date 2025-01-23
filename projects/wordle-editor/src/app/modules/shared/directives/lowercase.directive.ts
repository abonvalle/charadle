import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[lowercase]',
    standalone: false
})
export class LowercaseDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input') onInput() {
    let value: string = this.el.nativeElement.value;

    this.el.nativeElement.value = value.toLowerCase();
  }
}
