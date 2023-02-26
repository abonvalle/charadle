import { Injectable } from '@angular/core';
import { GameService } from '@core/services/game.service';
import { Letter, letterState } from 'projects/wordle/src/app/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class KeyboardService {
  letters: Map<string, Letter>;
  keyboard: { [row: number]: Letter[] };
  letterFeedback$: BehaviorSubject<string[]>;
  constructor(private _gameService: GameService) {
    this.letters = new Map();
    this.keyboard = {};
    this.letterFeedback$ = new BehaviorSubject<string[]>([]);
    this._setKeyboardAndLetters();
  }
  isEnterDisabled(letter: string): boolean {
    return letter === 'enter' && this._gameService.hasCurrentGuessNotEnoughLetter();
  }
  enter() {
    this._gameService.submitGuess();
  }

  delete() {
    this._gameService.removeLastGuessLetter();
  }

  enterLetter(letter: string): void {
    this.feedbackLetter(letter);

    this._gameService.addCurrentGuessLetter(letter);
  }

  private _setKeyboardAndLetters() {
    const keyboardSet = {
      1: ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      2: ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
      3: ['enter', 'w', 'x', 'c', 'v', 'b', 'n', 'delete']
    };

    Object.entries(keyboardSet).forEach(([rowNumber, letters]) => {
      const lettersObjs: Letter[] = [];
      letters.forEach((letter, index) => {
        const special = !!['enter', 'delete'].includes(letter);
        const letterObj = new Letter(letter, parseInt(rowNumber), index, special);
        lettersObjs.push(letterObj);
        this.letters.set(letter, letterObj);
      });
      this.keyboard[parseInt(rowNumber)] = lettersObjs;
    });
  }

  enterSpecialLetter(letter: string): void {
    this.feedbackLetter(letter);
    return letter === 'delete' ? this.delete() : this.enter();
  }
  feedbackLetter(letter: string): void {
    setTimeout(() => {
      const letters = this.letterFeedback$?.value;
      letters?.shift();
      this.letterFeedback$.next([...letters]);
    }, 200);
    this.letterFeedback$.next([...this.letterFeedback$.value, letter]);
    console.warn(this.letterFeedback$.value);
  }
  isLetterSpecial(letter: string): boolean {
    return letter === 'delete' || letter === 'enter';
  }
  getLetterState(letter: string): letterState {
    return this.letters.get(letter)?.state ?? '';
  }
}
