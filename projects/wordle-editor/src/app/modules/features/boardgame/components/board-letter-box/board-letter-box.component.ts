import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BoardBox } from '@models/*';

@Component({
  selector: 'board-letter-box',
  templateUrl: 'board-letter-box.component.html',
  styleUrls: ['board-letter-box.component.css'],
  // styles: [':host{flex-basis: 16.666667%;}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardLetterBoxComponent {
  @Input() boardBox!: BoardBox;
  constructor() {}
}
