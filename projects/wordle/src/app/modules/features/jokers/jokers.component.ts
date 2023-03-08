import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JokerService } from '@core/services/joker.service';

@Component({
  selector: 'jokers',
  // styles: [':host{overflow:hidden;height:100%}'],
  templateUrl: 'jokers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JokersComponent {
  constructor(public jokerService: JokerService) {}

  useJoker1(): void {
    this.jokerService.useJoker1();
  }
  useJoker2(): void {
    this.jokerService.useJoker2();
  }
  useJoker3(): void {
    this.jokerService.useJoker3();
  }
}
