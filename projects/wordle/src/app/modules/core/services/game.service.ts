import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { letterState } from '@core/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GameService {
  wordle$: BehaviorSubject<string>;
  currentGuess$: BehaviorSubject<string>;
  guesses$: BehaviorSubject<string[]>;
  success$: BehaviorSubject<boolean>;
  constructor(private _snackBar: MatSnackBar) {
    this.wordle$ = new BehaviorSubject('khal');
    this.currentGuess$ = new BehaviorSubject<string>('');
    this.guesses$ = new BehaviorSubject<string[]>(['eren', 'jean', 'jean', 'jean', 'jean']);
    this.success$ = new BehaviorSubject<boolean>(false);
  }
  hasCurrentGuessEnoughLetter(): boolean {
    return this.wordle$.value?.length > this.currentGuess$.value?.length;
  }
  addCurrentGuessLetter(letter: string): void {
    if (this.hasCurrentGuessEnoughLetter()) {
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
    const currentGuess = this.currentGuess$.value;
    if (!this.hasCurrentGuessEnoughLetter()) {
      return;
    }
    if (!this.list.includes(currentGuess)) {
      let snackBarRef = this.openSnackBar('Prénom inconnu', 'alert', 'Signaler comme existant');
      const snackAction = snackBarRef.onAction().subscribe(() => {
        this.tagNameAsValid(currentGuess);
      });
      setTimeout(() => snackAction?.unsubscribe(), 3550);
      return;
    }
    if (currentGuess === this.wordle$.value) {
      this.openSnackBar('Bravo !', 'success');
      this.success$.next(true);
    }
    this.guesses$.next([...this.guesses$.value, currentGuess]);
    this.currentGuess$.next('');
  }
  list = ['slt', 'khal'];
  openSnackBar(msg: string, type?: 'alert' | 'success' | '', action?: string): MatSnackBarRef<TextOnlySnackBar> {
    return this._snackBar.open(msg, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3500,
      panelClass: ['font-bold', 'text-white', type === 'alert' ? 'bg-red-600' : 'bg-green-600']
    });
  }
  tagNameAsValid(name: string) {
    console.warn('tag as valid ', name);
    return;
  }
}
