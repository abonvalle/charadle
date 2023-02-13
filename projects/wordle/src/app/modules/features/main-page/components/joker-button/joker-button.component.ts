import { Component, Input } from '@angular/core';

@Component({
  selector: 'joker-button',
  styles: [':host{position:relative}'],
  templateUrl: 'joker-button.component.html'
})
export class JokerButtonComponent {
  @Input() uses: '1/3' | '2/3' | '1/5' | '2/5' | '3/5' | '4/5' | '0' = '0';
  constructor() {}
}
