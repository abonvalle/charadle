import { Component } from '@angular/core';
import { Letter } from '@core/models';
import { GameService } from '@core/services/game.service';
import { PlatformService } from '@core/services/platform.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'keyboard',
  templateUrl: 'keyboard.component.html'
})
export class KeyboardComponent {
  letters: Map<string, Letter>;
  keyboard: { [row: number]: string[] };
  letterFeedback$: BehaviorSubject<string[]>;
  constructor(public gameService: GameService, public platformServ: PlatformService) {
    this.letters = new Map();
    this.keyboard = {};
    this.letterFeedback$ = new BehaviorSubject<string[]>([]);
    this._setKeyboardAndLetters();
  }
  enter() {
    this.gameService.submitGuess();
  }

  delete() {
    this.gameService.removeLastGuessLetter();
  }
  clickEnterLetter(letter: string): void {
    if (this.platformServ.touchStart$?.value) {
      return;
    }
    this.enterLetter(letter);
  }
  clickEnterSpecialLetter(letter: string): void {
    if (this.platformServ.touchStart$?.value) {
      return;
    }
    this.enterSpecialLetter(letter);
  }
  enterLetter(letter: string): void {
    setTimeout(() => {
      const letters = this.letterFeedback$?.value;
      letters?.shift();
      this.letterFeedback$.next([...letters]);
    }, 200);
    this.letterFeedback$.next([...this.letterFeedback$.value, letter]);

    this.gameService.addCurrentGuessLetter(letter);
  }

  private _setKeyboardAndLetters() {
    this.keyboard = {
      1: ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      2: ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
      3: ['enter', 'w', 'x', 'c', 'v', 'b', 'n', 'delete']
    };

    Object.entries(this.keyboard).forEach(([rowNumber, letters]) => {
      letters.forEach((letter, index) => {
        this.letters.set(letter, new Letter(letter, parseInt(rowNumber), index));
      });
    });
  }
  getSpecialLetter(letter: string): string {
    return letter === 'delete' ? '<i class="icon icon-delete"></i>' : '<i class="icon icon-corner-down-left"></i>';
  }
  enterSpecialLetter(letter: string): void {
    setTimeout(() => {
      const letters = this.letterFeedback$?.value;
      letters?.shift();
      this.letterFeedback$.next([...letters]);
    }, 200);
    this.letterFeedback$.next([...this.letterFeedback$.value, letter]);

    return letter === 'delete' ? this.delete() : this.enter();
  }
  isLetterSpecial(letter: string): boolean {
    return letter === 'delete' || letter === 'enter';
  }
}
