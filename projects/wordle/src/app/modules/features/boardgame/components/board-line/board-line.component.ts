import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'board-line',
  templateUrl: 'board-line.component.html'
  // styles: [':host{flex-grow:1}']
})
export class BoardLineComponent implements OnChanges {
  @Input() boxCount: number = 0;
  @Input() cursor: number = -1;
  @Input() text: string = '';
  @Input() isCurrent: boolean = false;
  boxes$: BehaviorSubject<number[]> = new BehaviorSubject(Array(this.boxCount));
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) {
      return;
    }
    if (changes['boxCount']) {
      this.boxes$.next(Array(this.boxCount));
    }
  }
  isCursor(index: number): boolean {
    return this.cursor === index;
  }
}
