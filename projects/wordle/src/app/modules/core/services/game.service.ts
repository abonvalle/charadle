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
  board$: BehaviorSubject<Map<number, { guess: string; submitted: boolean; current: boolean; lineIndex: number }>>;
  currentLine$: BehaviorSubject<number>;
  success$: BehaviorSubject<boolean>;
  destroy$: Subject<void>;
  constructor(private _snackBar: MatSnackBar, private _localStrgeServ: LocalStorageService) {
    this.wordle$ = new BehaviorSubject('');
    this.success$ = new BehaviorSubject<boolean>(false);
    this.board$ = new BehaviorSubject(new Map());

    this.currentLine$ = new BehaviorSubject<number>(0);
    this.destroy$ = new Subject();
    console.warn(charactersJSON);
    console.warn(wordsJSON);
    this._event();
    this.setBoard();
    this.setWordle();
  }
  setBoard() {
    const board2 = new Map();
    board2.set(0, { guess: '', submitted: false, current: true, lineIndex: 0 });
    board2.set(1, { guess: '', submitted: false, current: false, lineIndex: 1 });
    board2.set(2, { guess: '', submitted: false, current: false, lineIndex: 2 });
    board2.set(3, { guess: '', submitted: false, current: false, lineIndex: 3 });
    board2.set(4, { guess: '', submitted: false, current: false, lineIndex: 4 });
    board2.set(5, { guess: '', submitted: false, current: false, lineIndex: 5 });
    this.board$ = new BehaviorSubject(board2);
  }
  ngOnDestroy(): void {
    this.destroy$?.next();
    this.destroy$?.unsubscribe();
  }
  private _event(): void {
    this._localStrgeServ.clear$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.setBoard();
      this.success$.next(false);
    });
  }
  hasCurrentGuessNotEnoughLetter(): boolean {
    const board2 = this.board$?.value;
    const board2CurrentLine = board2.get(this.currentLine$?.value);
    return !!board2CurrentLine && this.wordle$.value?.length > board2CurrentLine.guess?.length;
  }

  addCurrentGuessLetter(letter: string): void {
    if (this.hasCurrentGuessNotEnoughLetter()) {
      const board2 = this.board$?.value;
      const board2CurrentLine = board2.get(this.currentLine$?.value);
      if (!!board2CurrentLine) {
        board2CurrentLine.guess = board2CurrentLine.guess + letter;
        board2.set(this.currentLine$?.value, board2CurrentLine);
        this.board$.next(board2);
      }
    }
  }

  removeLastGuessLetter(): void {
    const board2 = this.board$?.value;
    const board2CurrentLine = board2.get(this.currentLine$?.value);
    if (!!board2CurrentLine) {
      const guess = board2CurrentLine.guess.split('');
      guess.pop();
      board2CurrentLine.guess = guess.join('');
      board2.set(this.currentLine$?.value, board2CurrentLine);
      this.board$.next(board2);
    }
  }

  getLetterState(
    line: { guess: string; submitted: boolean; current: boolean; lineIndex: number },
    indexLetter: number
  ): letterState {
    const letter = line ? line.guess[indexLetter] : '';
    if (this.wordle$?.value[indexLetter] === letter) {
      return 'right';
    } else if (this.wordle$?.value.includes(letter ?? '')) {
      return 'partial';
    } else {
      return 'unused';
    }
  }

  submitGuess(): void {
    const board2 = this.board$?.value;
    const board2CurrentLineIndex = this.currentLine$?.value;
    const board2CurrentLine = board2.get(board2CurrentLineIndex);
    if (!board2CurrentLine) {
      return;
    }
    const currentGuess = board2CurrentLine.guess;
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

    board2CurrentLine.current = false;
    board2CurrentLine.submitted = true;
    board2.set(board2CurrentLineIndex, board2CurrentLine);
    const board2NextLine = board2.get(board2CurrentLineIndex + 1);
    if (!!board2NextLine) {
      board2NextLine.current = true;
      board2.set(this.currentLine$?.value + 1, board2NextLine);
    }
    this.board$.next(board2);

    this.currentLine$.next(this.currentLine$?.value + 1);
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
