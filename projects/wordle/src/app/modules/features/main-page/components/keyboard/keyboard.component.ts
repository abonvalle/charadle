import { Component } from '@angular/core';
import { JokerService } from '@core/services/joker.service';
import { PlatformService } from '@core/services/platform.service';
import { KeyboardService } from './keyboard.service';

@Component({
  selector: 'keyboard',
  templateUrl: 'keyboard.component.html'
})
export class KeyboardComponent {
  constructor(
    public keyboardService: KeyboardService,
    public jokerService: JokerService,
    private _platformServ: PlatformService
  ) {}

  isDisabled(letter: string): boolean {
    return this.keyboardService.isEnterDisabled(letter);
  }
  enterSpecialLetter(letter: string): void {
    this.keyboardService.enterSpecialLetter(letter);
  }
  clickEnterSpecialLetter(letter: string): void {
    if (this._platformServ.touchStart$?.value) {
      return;
    }
    this.keyboardService.enterSpecialLetter(letter);
  }
  clickEnterLetter(letter: string): void {
    if (this._platformServ.touchStart$?.value) {
      return;
    }
    this.enterLetter(letter);
  }
  enterLetter(letter: string): void {
    this.keyboardService.enterLetter(letter);
  }
  clickJoker(joker: number): void {
    if (this._platformServ.touchStart$?.value) {
      return;
    }
    this.touchJoker(joker);
  }
  touchJoker(joker: number): void {
    this.jokerService.useJoker(joker);
  }

  getLetterClass(letter: string): string {
    const state = this.keyboardService.getLetterState(letter);
    switch (state) {
      case 'partial':
        return 'bg-partial';
        break;
      case 'right':
        return 'bg-right';
        break;
      case 'unused':
        return 'bg-unused';
        break;
      default:
        return 'bg-secondary border-sky-900';
    }
  }
}
