import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BoardGame, keyboardKeyBackground } from 'projects/wordle/src/app/models';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Wordle } from '../../../models/wordle.model';
import { APIService } from './api.service';
import { AssetsService } from './assets.service';
import { JokersService } from './jokers.service';
import { KeyboardService } from './keyboard.service';
import { LocalStorageService } from './local-storage.service';
import { SnackbarService } from './snackbar.service';

@Injectable({ providedIn: 'root' })
export class GameService implements OnDestroy {
  boardGame$: BehaviorSubject<BoardGame | null> = new BehaviorSubject<BoardGame | null>(null);
  destroy$: Subject<void> = new Subject();
  constructor(
    private _localStrgServ: LocalStorageService,
    private _snackbarService: SnackbarService,
    private _keyboardServ: KeyboardService,
    private _jokersServ: JokersService,
    private _apiServ: APIService,
    private _router: Router,
    private _assetsServ: AssetsService
  ) {
    this._event();
  }
  ngOnDestroy(): void {
    this.destroy$?.next();
    this.destroy$?.unsubscribe();
  }
  initBoardGame(): void {
    const wordle = this.setWordle();
    const initBG = this._apiServ.getBoardgame(wordle);
    const initJokers = this._apiServ.getJokers(wordle);
    console.warn(initBG);
    this.boardGame$.next(initBG);
    this._jokersServ.initJokers(wordle, initJokers);
    this._keyboardServ.initKeyBoard(initBG, initJokers);
    if (initBG.end) {
      this._router.navigate(['/resultat']);
    }
  }

  private _event(): void {
    this._localStrgServ.clear$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.initBoardGame();
    });
    this._jokersServ.jokers$.pipe(takeUntil(this.destroy$)).subscribe((joks) => {
      const bg = this.boardGame$.value;
      joks?.placeLetterJoker.uses.forEach((letter) => {
        bg?.boardLines.forEach((bl) => {
          bl.boardBoxes.forEach((bb) => {
            if (bb.index === letter?.index) {
              bb.before = letter?.letter;
            }
          });
        });
      });
      this.boardGame$.next(bg);
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
    const words = this._assetsServ.wordsJSON;
    if (!words.includes(currentGuess)) {
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
      boardGame.success = true;
      boardGame.end = true;
    }

    boardGame?.incrementCurrentActiveBoardLine();
    if (boardGame?.end) {
      setTimeout(() => {
        this._router.navigate(['/resultat']);
      }, boardGame?.wordle.text.length * 375);
    }
    this.boardGame$.next(boardGame);
  }

  setWordle(): Wordle {
    let date = new Date();
    let numerodujour = date.getDate();
    let numerodumois = date.getMonth() + 1;
    let numeroannee = date.getFullYear() - 2022;
    const wordles = this._assetsServ.wordlesJSON;
    const ind =
      12 * (numerodujour - 1) + numerodumois + (Math.pow(numerodujour, 2) + 1 * numerodujour) / 2 + 868 * numeroannee;
    const text = wordles[ind - 1] ?? '';
    const charactersInfos = this._assetsServ.charactersInfosJSON as {
      [key: string]: { from: string; imgPath?: string; fullname?: string; difficulty?: number }; //todo : remove ? from imgPath & fullname
    };
    const serie = charactersInfos[text]?.from ?? '';
    const difficulty = charactersInfos[text]?.difficulty;
    const imgPath = charactersInfos[text]?.imgPath ?? '';
    const fullname = charactersInfos[text]?.fullname ?? text;
    return new Wordle({ date: date.toLocaleDateString('fr-FR'), text, serie, difficulty, imgPath, fullname });
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
}
