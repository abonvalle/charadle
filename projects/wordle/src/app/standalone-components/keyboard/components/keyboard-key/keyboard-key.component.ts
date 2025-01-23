import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, input } from '@angular/core';
import { PlatformService } from '@core/services/platform.service';
import { BehaviorSubject } from 'rxjs';
import { specialLetters } from '../../models/special-letters';

@Component({
  selector: 'app-keyboard-key',
  templateUrl: './keyboard-key.component.html',
  styles: [':host{display:contents}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, AsyncPipe]
})
export class KeyboardKeyComponent implements OnInit {
  readonly letter = input.required<string>();
  readonly backgroundClass = input<string>('bg-secondary');
  @Output() letterClick: EventEmitter<string> = new EventEmitter();
  feedBack$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isSpecial: boolean = false;
  letterIcon: string = '';

  constructor(private _platformServ: PlatformService) {}
  ngOnInit() {
    const letterValue = this.letter();
    if (!letterValue) {
      throw new TypeError('Letter should be instancied');
    }
    this.isSpecial = Object.keys(specialLetters).includes(letterValue);
    if (this.isSpecial) {
      const specialLetter = Object.entries(specialLetters).find(([letter]) => letter === this.letter());
      this.letterIcon = specialLetter ? specialLetter[1] : '';
    }
  }
  clickEnterLetter(letter: string): void {
    if (this._platformServ.touchStart$?.value) {
      return;
    }
    this.enterLetter(letter);
  }
  enterLetter(letter: string): void {
    this.feedbackLetter();
    this.letterClick.emit(letter);
  }

  feedbackLetter(): void {
    this.feedBack$.next(true);
    setTimeout(() => {
      this.feedBack$.next(false);
    }, 200);
  }
}
