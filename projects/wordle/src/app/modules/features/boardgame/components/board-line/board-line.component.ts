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
})
export class BoardLineComponent implements OnInit, OnChanges {
  @Input() cursor: number = -1;
  @Input() text: string = '';
  @Input() isCurrent: boolean = false;
  @Input() boardBoxes: Map<number, BoardBox> = new Map();
  boxCount$: BehaviorSubject<number> = new BehaviorSubject(0);
  letterSize$: BehaviorSubject<string> = new BehaviorSubject('8vw');
  boxSize$: BehaviorSubject<string> = new BehaviorSubject('8vw');
  constructor(private _cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this._cdr.detectChanges();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) {
      console.warn('54rgdrg');
      return;
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
