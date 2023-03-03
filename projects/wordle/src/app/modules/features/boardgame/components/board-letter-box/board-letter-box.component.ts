import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BoardBox } from '@models/*';

@Component({
  selector: 'board-letter-box',
  templateUrl: 'board-letter-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush

  // styles: [':host{flex-grow:1}']
})
export class BoardLetterBoxComponent implements OnChanges {
  @Input() boardBox!: BoardBox;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) {
      return;
    }
    if (changes['boardBox']) {
      console.warn('boardBox changes');
      // this._cdr.detectChanges();
    }
  }
  getBoxStyle(): {
    [klass: string]: any;
  } {
    return {
      width: this.boardBox.boxSize + 'vw',
      height: this.boardBox.boxSize + 'vw',
      'font-size': this.boardBox.boxSize / 1.8 + 'vw'
    };
  }
}
