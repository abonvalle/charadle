import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as charactersInfosJSON from '@assets/characters.json';
import * as wordlesJSON from '@assets/w1-3.json';
import * as wordsJSON from '@assets/words.json';
import { SuccessDialogComponent } from '@features/main-page/components/success-dialog/success-dialog.component';
import { BoardGame, keyboardKeyBackground } from 'projects/wordle/src/app/models';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Wordle } from '../../../models/wordle.model';
import { APIService } from './api.service';
import { JokerService } from './joker.service';
import { KeyboardService } from './keyboard.service';
import { LocalStorageService } from './local-storage.service';
import { SnackbarService } from './snackbar.service';

@Injectable({ providedIn: 'root' })
export class GameService implements OnDestroy {
  boardGame$: BehaviorSubject<BoardGame | null> = new BehaviorSubject<BoardGame | null>(null);
  destroy$: Subject<void> = new Subject();
  constructor(
    private _localStrgeServ: LocalStorageService,
    private _snackbarService: SnackbarService,
    private _keyboardServ: KeyboardService,
    private _jokerService: JokerService,
    private _apiServ: APIService,
    private _dialog: MatDialog
  ) {
    this._event();
  }
  ngOnDestroy(): void {
    this.destroy$?.next();
    this.destroy$?.unsubscribe();
  }
  initBoardGame(): void {
    const wordle = this.setWordle();
    this._jokerService.initJokers(wordle.text);
    const initBG = this._apiServ.getBoardgame(wordle);
    this.boardGame$.next(initBG);
  }

  private _event(): void {
    this._localStrgeServ.clear$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.initBoardGame();
    });
  }

  addCurrentGuessLetter(letter: string): void {
    let boardGame = this.boardGame$.value;
    const boardLine = boardGame?.getCurrentBoardLine();
    if (!boardLine?.isBoardLineFull()) {
      boardLine?.addLetter(letter);
    }
    this.boardGame$.next(boardGame);
  }

  removeLastGuessLetter(): void {
    let boardGame = this.boardGame$.value;
    const boardLine = boardGame?.getCurrentBoardLine();
    boardLine?.removeLetter();
    this.boardGame$.next(boardGame);
  }

  submitGuess(): void {
    let boardGame = this.boardGame$.value;
    let boardLine = boardGame?.getCurrentBoardLine();
    if (!boardLine) {
      return;
    }
    if (!boardLine.isBoardLineFull()) {
      this._snackbarService.openSnackBar('Pas assez de lettres', 'alert');
      return;
    }
    const currentGuess = boardLine.text;
    const words = wordsJSON;
    if (!words.words.includes(currentGuess)) {
      this._snackbarService.showUnkownNameAlert(currentGuess);
      return;
    }

    boardLine.boardBoxes.forEach((boardBox, index) => {
      let state: keyboardKeyBackground;
      if (boardBox.letter === boardGame?.wordle.text[index]) {
        state = 'right';
      } else if (boardGame?.wordle.text?.includes(boardBox.letter)) {
        state = 'partial';
      } else {
        state = 'unused';
      }
      boardBox.setBackground(state);
      this._keyboardServ.setKeyBg(boardBox.letter, state);
    });

    if (currentGuess === boardGame?.wordle.text) {
      this._snackbarService.openSnackBar('Bravo !', 'success');
      boardGame.success = true;
      this._dialog.open(SuccessDialogComponent);
    }

    boardGame?.incrementCurrentActiveBoardLine();
    this.boardGame$.next(boardGame);
  }

  setWordle(): Wordle {
    let date = new Date();
    let numerodujour = date.getDate();
    let numerodumois = date.getMonth() + 1;
    let numeroannee = date.getFullYear() - 2022;
    const wordles = wordlesJSON;
    const ind =
      12 * (numerodujour - 1) + numerodumois + (Math.pow(numerodujour, 2) + 1 * numerodujour) / 2 + 868 * numeroannee;
    const text = wordles.words[ind - 1] ?? '';
    const charactersInfos = charactersInfosJSON;
    const serie = charactersInfos[text as keyof typeof charactersInfos]?.from ?? '';
    return new Wordle({ date: date.toLocaleDateString(), text, serie });
  }
  enterLetter(letter: string): void {
    if (this.boardGame$.value?.success) {
      return;
    }
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

  useJoker1(): void {
    const bg = this.boardGame$.value;
    const jok = bg?.jokers.paintJoker;
    let letter;
    if (!jok || bg?.success) {
      return;
    }
    do {
      letter = jok.use();
      console.warn(letter, this._keyboardServ.hasLetterStates(letter ?? '', ['partial', 'right']));
    } while (letter != null && this._keyboardServ.hasLetterStates(letter, ['partial', 'right']));
    if (!letter) {
      this._snackbarService.openSnackBar(jok.soldOut ? 'Joker épuisé' : 'Toutes les lettres sont découvertes', 'alert');
      return;
    }
    jok.incrementUse();
    this._keyboardServ.setKeyBg(letter, 'partial');
    this.boardGame$.next(bg);
  }

  useJoker2(): void {
    const bg = this.boardGame$.value;
    const jok = bg?.jokers.placeLetterJoker;
    let letter;
    if (!jok || bg?.success) {
      return;
    }
    do {
      letter = jok.use();
      console.warn(letter, this._keyboardServ.hasLetterStates(letter?.letter ?? '', ['right']));
    } while (letter != null && this._keyboardServ.hasLetterStates(letter?.letter, ['right']));
    if (!letter) {
      this._snackbarService.openSnackBar(jok.soldOut ? 'Joker épuisé' : 'Toutes les lettres sont placées', 'alert');
      return;
    }
    jok.incrementUse();
    this._keyboardServ.setKeyBg(letter?.letter, 'right');
    this.boardGame$.next(bg);
  }

  useJoker3(): void {
    const bg = this.boardGame$.value;
    const jok = bg?.jokers.serieJoker;
    if (!jok || bg?.success) {
      return;
    }
    const serie = jok.use();
    if (serie) {
      this._snackbarService.openSnackBar(jok.soldOut ? 'Joker épuisé' : '');
      return;
    }
    jok.incrementUse();
    this.boardGame$.next(bg);
  }
}
