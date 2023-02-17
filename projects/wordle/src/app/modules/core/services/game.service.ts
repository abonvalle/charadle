import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import * as charactersJSON from '@assets/characters.json';
import * as wordlesJSON from '@assets/w1-3.json';
import * as wordsJSON from '@assets/words.json';
import { letterState } from '@core/models';
import { BehaviorSubject, Subject, takeUntil, timer } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class GameService {
  wordle$: BehaviorSubject<string>;
  currentGuess$: BehaviorSubject<string>;
  guesses$: BehaviorSubject<string[]>;
  success$: BehaviorSubject<boolean>;
  destroy$: Subject<void>;
  constructor(private _snackBar: MatSnackBar, private _localStrgeServ: LocalStorageService) {
    this.wordle$ = new BehaviorSubject('');
    this.currentGuess$ = new BehaviorSubject<string>('');
    this.guesses$ = new BehaviorSubject<string[]>([]);
    this.success$ = new BehaviorSubject<boolean>(false);
    this.destroy$ = new Subject();
    console.warn(charactersJSON);
    console.warn(wordsJSON);
    this._event();
    this.setWordle();
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
    const words = wordsJSON;
    if (!words.words.includes(currentGuess)) {
      let snackBarRef = this.openSnackBar('Prénom inconnu', 'alert', 'Signaler comme existant');
      snackBarRef
        .onAction()
        .pipe(takeUntil(timer(200)))
        .subscribe(() => {
          this.tagNameAsValid(currentGuess);
        });
      return;
    }
    if (currentGuess === this.wordle$.value) {
      this.openSnackBar('Bravo !', 'success');
      this.success$.next(true);
    }
    this.guesses$.next([...this.guesses$.value, currentGuess]);
    this.currentGuess$.next('');
  }
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
  setWordle() {
    let date = new Date();
    let numerodujour = date.getDate();
    let numerodumois = date.getMonth() + 1;
    let numeroannee = date.getFullYear() - 2022;
    const wordles = wordlesJSON;
    const ind =
      12 * (numerodujour - 1) + numerodumois + (Math.pow(numerodujour, 2) + 1 * numerodujour) / 2 + 868 * numeroannee;
    this.wordle$.next(wordles.words[ind - 1] ?? '');
  }
}
