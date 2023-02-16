import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import * as characters from '@assets/characters.json';
import * as words from '@assets/words.json';
import { letterState } from '@core/models';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class GameService {
  wordle$: BehaviorSubject<string>;
  currentGuess$: BehaviorSubject<string>;
  guesses$: BehaviorSubject<string[]>;
  success$: BehaviorSubject<boolean>;
  destroy$: Subject<void>;
  constructor(private _snackBar: MatSnackBar, private _localStrgeServ: LocalStorageService) {
    this.wordle$ = new BehaviorSubject('khald');
    this.currentGuess$ = new BehaviorSubject<string>('');
    this.guesses$ = new BehaviorSubject<string[]>(['eren', 'jean', 'jean', 'jean', 'jean']);
    this.success$ = new BehaviorSubject<boolean>(false);
    this.destroy$ = new Subject();
    console.warn(characters);
    console.warn(words);
    this._event();
  }
  ngOnDestroy(): void {
    this.destroy$?.next();
    this.destroy$?.unsubscribe();
  }
  private _event(): void {
    this._localStrgeServ.clear$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.currentGuess$.next('');
      this.guesses$.next([]);
      this.success$.next(false);
    });
  }
  hasCurrentGuessNotEnoughLetter(): boolean {
    return this.wordle$.value?.length > this.currentGuess$.value?.length;
  }
  addCurrentGuessLetter(letter: string): void {
    if (this.hasCurrentGuessNotEnoughLetter()) {
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
    if (this.hasCurrentGuessNotEnoughLetter()) {
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
      panelClass: ['font-bold', 'text-white', type ?? '']
    });
  }
  tagNameAsValid(name: string) {
    console.warn('tag as valid ', name);
    return;
  }
}
