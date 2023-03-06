import { KeyValue } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { BoardBox } from '@models/*';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'board-line',
  templateUrl: 'board-line.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
  // styles: [':host{flex-grow:1}']
})
export class BoardLineComponent implements OnInit, OnChanges {
  // @Input() boxCount: number = 0;
  @Input() cursor: number = -1;
  @Input() text: string = '';
  @Input() isCurrent: boolean = false;
  // @Input() boardLine!: BoardLine;
  @Input() boardBoxes: Map<number, BoardBox> = new Map();
  // boxes$: BehaviorSubject<number[]> = new BehaviorSubject(Array(this.boxCount));
  boxCount$: BehaviorSubject<number> = new BehaviorSubject(0);
  letterSize$: BehaviorSubject<string> = new BehaviorSubject('8vw');
  boxSize$: BehaviorSubject<string> = new BehaviorSubject('8vw');
  constructor(private _cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    // this.boxes$.next(Array(this.boxCount));

    this._cdr.detectChanges();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) {
      console.warn('54rgdrg');
      return;
    }
    // console.warn('sqzefefsfdef');
    // if (changes['boxCount']) {
    // this.boxes$.next(Array(this.boxCount));
    // this.letterSize$.next(this._getLetterSize(this.boxCount) + 'vw');
    // this.boxSize$.next(this._getBoxSize(this.boxCount) + 'vw');
    // }
    if (changes['boardLine']) {
      console.warn('boardLine cmpnt - inpt change');
    }
    if (changes['boardBoxes']) {
      this._cdr.detectChanges();
    }
  }
  trackByFn(_index: number, item: KeyValue<number, BoardBox>) {
    return item.value.index;
  }
  isCursor(index: number): boolean {
    return this.cursor === index;
  }
}
