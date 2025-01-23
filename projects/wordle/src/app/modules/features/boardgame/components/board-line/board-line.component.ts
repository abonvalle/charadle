import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, SimpleChanges, input } from '@angular/core';
import { BoardBox } from '@models';
import { NgClass } from '@angular/common';
import { BoardLetterBoxComponent } from '../board-letter-box/board-letter-box.component';

@Component({
    selector: 'board-line',
    templateUrl: 'board-line.component.html',
    styleUrls: ['board-line.component.css'],
    styles: [':host{flex-basis: 16.666667%;}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass, BoardLetterBoxComponent]
})
export class BoardLineComponent implements OnChanges {
  readonly boardBoxes = input<BoardBox[]>([]);
  readonly classes = input<string[]>([]);
  readonly isActive = input<boolean>(false);
  rowClass: string = 'letter-row-' + this.boardBoxes().length + ' ' + this.classes().join(' ');
  constructor(private _cdr: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && (changes['boardBoxes'] || changes['classes'])) {
      this.rowClass = 'letter-row-' + this.boardBoxes().length + ' ' + this.classes().join(' ');
      this._cdr.detectChanges();
    }
  }
  isCurrentBoardBoxActive(index: number): boolean {
    return this.isActive() ? index === this.boardBoxes().map((bb) => bb.letter).length : false;
  }
}
