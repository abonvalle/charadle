import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BoardBox } from '@models/*';

@Component({
  selector: 'board-line',
  templateUrl: 'board-line.component.html',
  styleUrls: ['board-line.component.css'],
  styles: [':host{flex-basis: 16.666667%;}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardLineComponent implements OnChanges {
  @Input() boardBoxes: BoardBox[] = [];
  constructor(private _cdr: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['boardBoxes']) {
      this._cdr.detectChanges();
    }
  }

  trackByFn(_index: number, item: BoardBox) {
    return item.index;
  }
}
