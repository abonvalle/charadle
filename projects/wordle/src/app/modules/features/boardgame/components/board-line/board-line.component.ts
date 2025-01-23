import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BoardBox } from '@models';

@Component({
    selector: 'board-line',
    templateUrl: 'board-line.component.html',
    styleUrls: ['board-line.component.css'],
    styles: [':host{flex-basis: 16.666667%;}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class BoardLineComponent implements OnChanges {
  @Input() boardBoxes: BoardBox[] = [];
  @Input() classes: string[] = [];
  @Input() isActive: boolean = false;
  rowClass: string = 'letter-row-' + this.boardBoxes.length + ' ' + this.classes.join(' ');
  constructor(private _cdr: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && (changes['boardBoxes'] || changes['classes'])) {
      this.rowClass = 'letter-row-' + this.boardBoxes.length + ' ' + this.classes.join(' ');
      this._cdr.detectChanges();
    }
  }
  isCurrentBoardBoxActive(index: number): boolean {
    return this.isActive ? index === this.boardBoxes.map((bb) => bb.letter).length : false;
  }
}
