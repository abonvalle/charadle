import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BoardBox } from '@models/*';

@Component({
  selector: 'board-line',
  templateUrl: 'board-line.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardLineComponent {
  @Input() boardBoxes: BoardBox[] = [];
  constructor() {}
  trackByFn(_index: number, item: BoardBox) {
    return item.index;
  }
}
