import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BoardBox } from '@models/*';

@Component({
  selector: 'board-letter-box',
  templateUrl: 'board-letter-box.component.html',
  styleUrls: ['board-letter-box.component.css'],
  // styles: [':host{flex-basis: 16.666667%;}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardLetterBoxComponent implements OnInit {
  @Input({ required: true }) boardBox!: BoardBox;
  constructor() {}
  ngOnInit(): void {
    if (!this.boardBox) {
      throw new TypeError('boardBox should be instancied');
    }
  }
}
