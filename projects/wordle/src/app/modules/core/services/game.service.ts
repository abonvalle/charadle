import { Clipboard } from '@angular/cdk/clipboard';
import { Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import * as wordlesJSON from '@assets/w1-3.json';
import * as wordsJSON from '@assets/words.json';
import { BoardGame, keyboardKeyBackground, letterState } from 'projects/wordle/src/app/models';
import { BehaviorSubject, first, Subject, takeUntil, timer } from 'rxjs';
import { APIService } from './api.service';
import { JokerService } from './joker.service';
import { KeyboardService } from './keyboard.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class GameService implements OnDestroy {
  wordle$: BehaviorSubject<string> = new BehaviorSubject('');
  /**@deprecated */
  board$: BehaviorSubject<Map<number, { guess: string; submitted: boolean; current: boolean; lineIndex: number }>>;
  boardGame$: BehaviorSubject<BoardGame | null> = new BehaviorSubject<BoardGame | null>(null);
  success$: BehaviorSubject<boolean>;
  destroy$: Subject<void> = new Subject();
  constructor(
    private _snackBar: MatSnackBar,
    private _localStrgeServ: LocalStorageService,
    private _keyboardServ: KeyboardService,
    private _jokerService: JokerService,
    private _apiServ: APIService,
    private _clipboard: Clipboard
  ) {
    this.success$ = new BehaviorSubject<boolean>(false);
    this.board$ = new BehaviorSubject(new Map());
    this._event();
  }
  ngOnDestroy(): void {
    this.destroy$?.next();
    this.destroy$?.unsubscribe();
  }
  initGame(): void {
    const date = this.setWordle();
    this._jokerService.initJokers(this.wordle$.value);
    const initBG = this._apiServ.getBoardgame(this.wordle$.value, date.toLocaleDateString());
    this.boardGame$.next(initBG);
  }

  private _event(): void {
    this._localStrgeServ.clear$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.initGame();
      this.success$.next(false);
    });
  }

  addCurrentGuessLetter(letter: string): void {
    // if (this.hasCurrentGuessNotEnoughLetter()) {
    let boardGame = this.boardGame$.value;
    // boardGame?.addLetter(letter);
    const boardLine = boardGame?.getCurrentBoardLine();
    if (!boardLine?.isBoardLineFull()) {
      boardLine?.addLetter(letter);
    }
    this.boardGame$.next(boardGame);

    //   console.warn(this.boardGame$?.value);
    //   const board2 = this.board$?.value;
    //   const board2CurrentLine = board2.get(this.currentLine$?.value);
    //   if (!!board2CurrentLine) {
    //     board2CurrentLine.guess = board2CurrentLine.guess + letter;
    //     board2.set(this.currentLine$?.value, board2CurrentLine);
    //     this.board$.next(board2);
    //   }
    // }
  }

  removeLastGuessLetter(): void {
    let boardGame = this.boardGame$.value;
    // boardGame?.removeLetter();
    const boardLine = boardGame?.getCurrentBoardLine();
    boardLine?.removeLetter();
    this.boardGame$.next(boardGame);

    // const board2 = this.board$?.value;
    // const board2CurrentLine = board2.get(this.currentLine$?.value);
    // if (!!board2CurrentLine) {
    //   const guess = board2CurrentLine.guess.split('');
    //   guess.pop();
    //   board2CurrentLine.guess = guess.join('');
    //   board2.set(this.currentLine$?.value, board2CurrentLine);
    //   this.board$.next(board2);
    // }
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
    // const board2 = this.board$?.value;
    // const board2CurrentLineIndex = this.currentLine$?.value;
    // const board2CurrentLine = board2.get(board2CurrentLineIndex);

    let boardGame = this.boardGame$.value;
    let boardLine = boardGame?.getCurrentBoardLine();
    if (!boardLine) {
      return;
    }
    // const currentGuess = board2CurrentLine.guess;
    if (!boardLine.isBoardLineFull()) {
      this.openSnackBar('Pas assez de lettres', 'alert');
      return;
    }
    const currentGuess = boardLine.text;
    const words = wordsJSON;
    if (!words.words.includes(currentGuess)) {
      this.showUnkownNameAlert(currentGuess);
      return;
    }

    boardLine.boardBoxes.forEach((boardBox, index) => {
      let state: keyboardKeyBackground;
      if (boardBox.letter === this.wordle$.value[index]) {
        state = 'right';
      } else if (this.wordle$.value?.includes(boardBox.letter)) {
        state = 'partial';
      } else {
        state = 'unused';
      }
      boardBox.setBackground(state);
      this._keyboardServ.setKeyBg(boardBox.letter, state);
    });

    if (currentGuess === this.wordle$.value) {
      this.openSnackBar('Bravo !', 'success');
      this.success$.next(true);
    }

    // board2CurrentLine.current = false;
    // board2CurrentLine.submitted = true;
    // board2.set(board2CurrentLineIndex, board2CurrentLine);
    // const board2NextLine = board2.get(board2CurrentLineIndex + 1);
    // if (!!board2NextLine) {
    //   board2NextLine.current = true;
    //   board2.set(this.currentLine$?.value + 1, board2NextLine);
    // }
    // this.board$.next(board2);

    // this.currentLine$.next(this.currentLine$?.value + 1);
    boardGame?.incrementCurrentActiveBoardLine();
    this.boardGame$.next(boardGame);
  }

  showUnkownNameAlert(currentGuess: string): void {
    let snackBarRef = this.openSnackBar('Prénom inconnu', 'alert', 'Signaler comme existant');
    snackBarRef
      .onAction()
      .pipe(first(), takeUntil(timer(4000)))
      .subscribe(() => {
        this.tagNameAsValid(currentGuess);
      });
  }

  openSnackBar(msg: string, type?: 'alert' | 'success', action?: string): MatSnackBarRef<TextOnlySnackBar> {
    const panelClass = ['font-bold', 'text-white'];
    type && panelClass.push(type);
    return this._snackBar.open(msg, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3500,
      panelClass
    });
  }
  tagNameAsValid(name: string) {
    console.warn('tag as valid ', name);
    this.openSnackBar('Prénom en cours de vérification, merci !');
    return;
  }
  setWordle(): Date {
    let date = new Date();
    let numerodujour = date.getDate();
    let numerodumois = date.getMonth() + 1;
    let numeroannee = date.getFullYear() - 2022;
    const wordles = wordlesJSON;
    const ind =
      12 * (numerodujour - 1) + numerodumois + (Math.pow(numerodujour, 2) + 1 * numerodujour) / 2 + 868 * numeroannee;
    this.wordle$.next(wordles.words[ind - 1] ?? '');
    return date;
  }
  isDifficult() {
    return false;
  }
  enterLetter(letter: string): void {
    if (letter === 'enter') {
      this.submitGuess();
      return;
    }

    if (letter === 'delete') {
      this.removeLastGuessLetter();
      return;
    }

    this.addCurrentGuessLetter(letter);
  }
  shareScore(): void {
    /**Wordle Séries edition #23 */
    /** 🟧⬛⬛🟧⬛⬛ */
    /** 🟧⬛⬛⬛⬛🟩 */
    /** 🟧⬛⬛🟩🟩🟩 */
    /**🎯x20 - ✍️x5 | 🚫🃏 => 🖌️x3, 🔤x3, 🎥x1 */
    /**https://wordle-series.abvdev.fr */
    const joker1Count = this._jokerService.joker1$.value.useCount;
    const joker2Count = this._jokerService.joker2$.value.useCount;
    const joker3Count = this._jokerService.joker3$.value.useCount;
    const hasUsedJoker = joker1Count !== 0 || joker2Count !== 0 || joker3Count !== 0;
    const nbTries = this.boardGame$.value?.currentActiveBoardLine;
    const tries = this.boardGame$.value?.getTries();
    const worldeDate = this.boardGame$.value?.wordleDate;
    const text = [`Wordle Séries edition #${worldeDate} `];
    tries?.forEach((aTry) => {
      text.push('      ' + aTry);
    });
    if (hasUsedJoker) {
      text.push(`✍️x${nbTries} | 🃏 => 🖌️x${joker1Count}, 🔤x${joker2Count}, 🎥x${joker3Count}`);
    } else {
      text.push(`✍️x${nbTries} | 🚫🃏`);
    }
    text.push('https://wordle-series.abvdev.fr');

    this._copyLongText(text.join('\n'))
      ? this.openSnackBar('Copié 👌', 'success')
      : this._snackBar.open('Impossible de copier le résultat 🤷', 'error');
  }
  private _copyLongText(text: string): boolean {
    const pending = this._clipboard.beginCopy(text);
    let remainingAttempts = 3;
    let result;
    do {
      result = pending.copy();
    } while (!result || --remainingAttempts);
    pending.destroy();
    return !!result;
  }
}
