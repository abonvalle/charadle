import { Component, Input } from '@angular/core';

@Component({
  selector: 'board-letter-box',
  templateUrl: 'board-letter-box.component.html'
  // styles: [':host{flex-grow:1}']
})
export class BoardLetterBoxComponent {
  @Input() active: boolean = false;
  @Input() letter: string = '';
  constructor() {}
}
