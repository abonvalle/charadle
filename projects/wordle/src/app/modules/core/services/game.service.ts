import { Injectable } from '@angular/core';
import { letterState } from '@core/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GameService {
  wordle$: BehaviorSubject<string>;
  currentGuess$: BehaviorSubject<string>;
  guesses$: BehaviorSubject<string[]>;
  constructor() {
    this.wordle$ = new BehaviorSubject('Khal');
    this.currentGuess$ = new BehaviorSubject<string>('');
    this.guesses$ = new BehaviorSubject<string[]>(['eren', 'jean', 'jean', 'jean', 'jean']);
  }
  get wordleLength(): number {
    return this.wordle$.value?.length;
  }
  get isWordleLengthSupCurrentGuess(): boolean {
    return this.wordle$.value?.length > this.currentGuess$.value?.length;
  }

  addCurrentGuessLetter(letter: string): void {
    if (this.isWordleLengthSupCurrentGuess) {
      this.currentGuess$.next(this.currentGuess$.value + letter);
    }
  }

  removeLastGuessLetter(): void {
    const letters = this.currentGuess$.value;
    this.currentGuess$.next(letters.slice(0, letters.length - 1));
  }

  getGuessLetter(index: number): string {
    const letters = this.currentGuess$.value;
    return letters ? letters[index] ?? '' : '';
  }

  getLetterState(letter: string, index: number): letterState {
    if (this.wordle$.value[index] === letter) {
      return 'right';
    } else if (this.wordle$.value.includes(letter)) {
      return 'partial';
    } else {
      return 'unused';
    }
  }

  submitGuess(): void {
    this.guesses$.next([...this.guesses$.value, this.currentGuess$.value]);
    this.currentGuess$.next('');
  }
}
