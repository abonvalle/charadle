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
import { BoardBox, BoardLine } from '@models/*';
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
  @Input() boardLine!: BoardLine;
  // boxes$: BehaviorSubject<number[]> = new BehaviorSubject(Array(this.boxCount));
  letterSize$: BehaviorSubject<string> = new BehaviorSubject('8vw');
  boxSize$: BehaviorSubject<string> = new BehaviorSubject('8vw');
  constructor(private _cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    // this.boxes$.next(Array(this.boxCount));
    // this.letterSize$.next(this._getLetterSize(this.boxCount) + 'vw');
    // this.boxSize$.next(this._getBoxSize(this.boxCount) + 'vw');
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
  }
  trackByFn(_index: number, item: KeyValue<number, BoardBox>) {
    return item.value.index;
  }
  isCursor(index: number): boolean {
    return this.cursor === index;
  }
  // private _getBoxSize(boxCount: number): number {
  //   let size = 0;
  //   switch (boxCount) {
  //     case 2:
  //     case 3:
  //     case 4:
  //       size = 20;
  //       break;
  //     case 5:
  //       size = 16;
  //       break;
  //     case 6:
  //       size = 14;
  //       break;
  //     case 7:
  //     case 8:
  //     case 9:
  //       size = 12;
  //       break;
  //     case 10:
  //       size = 10;
  //       break;
  //     case 11:
  //     case 12:
  //       size = 8;
  //       break;
  //   }
  //   return size;
  // }
  // private _getLetterSize(boxCount: number): number {
  //   return this._getBoxSize(boxCount) / 1.8;
  // }
}
