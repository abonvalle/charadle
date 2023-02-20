import { Component, Input } from '@angular/core';
import { jokersUses } from '@core/services/joker.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'joker-button',
  styles: [':host{position:relative}'],
  templateUrl: 'joker-button.component.html'
})
export class JokerButtonComponent {
  @Input() uses: BehaviorSubject<jokersUses> = new BehaviorSubject<jokersUses>('0');
  constructor() {}
}
