import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  BoardBox,
  BoardGame,
  PaintJoker,
  PlaceLetterJoker,
  SerieJoker,
  letterState
} from 'projects/wordle/src/app/models';
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
    if (!wordle) {
      this._snackbarService.defaultErrorMsg();
      return;
    }
    const savedBG = this._apiServ.getBoardgame();
    const initBG = savedBG?.wordle.date !== wordle.date ? new BoardGame({ wordle }) : savedBG;
    const savedJokers = this._apiServ.getJokers(wordle);
    const initJokers =
      savedBG?.wordle.date !== wordle.date || !savedJokers
        ? {
            paintJoker: new PaintJoker({ difficulty: wordle.difficulty }),
            placeLetterJoker: new PlaceLetterJoker({ difficulty: wordle.difficulty }),
            serieJoker: new SerieJoker()
          }
        : savedJokers;
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
    if (!boardGame || !boardLine) {
      this._snackbarService.defaultErrorMsg();
      return;
    }
    if (!boardLine.isBoardLineFull()) {
      this._snackbarService.openSnackBar('Pas assez de lettres 🤨', 'alert');
      return;
    }
    const currentGuess = boardLine.text;
    const words = this._assetsServ.wordlesJSON;

    if (!words.includes(currentGuess)) {
      this._snackbarService.showUnkownNameAlert(currentGuess);
      return;
    }
    const wordle = boardGame?.wordle.text?.split('#')[0];
    if (!wordle) {
      this._snackbarService.defaultErrorMsg();
      return;
    }

    const wordleLetters: Map<string, number[]> = wordle.split('').reduce((map, letter, index) => {
      map.set(letter, map.has(letter) ? [...map.get(letter), index] : [index]);
      return map;
    }, new Map());

    const guessLetters: Map<string, { index: number; state: letterState; boardBox: BoardBox }[]> = Array.from(
      boardLine.boardBoxes.values()
    ).reduce((map: Map<string, { index: number; state: letterState; boardBox: BoardBox }[]>, boardBox, index) => {
      map.set(
        boardBox.letter,
        map.has(boardBox.letter)
          ? [...(map.get(boardBox.letter) ?? []), { index, state: '', boardBox }]
          : [{ index, state: '', boardBox }]
      );
      return map;
    }, new Map());

    //loop to tag 'unused' & 'right' letters
    guessLetters.forEach((guessLetter, key) => {
      if (!wordleLetters.has(key)) {
        guessLetter.map((l) => (l.state = 'unused'));
        return;
      }
      guessLetter.forEach((letter) => {
        const wordleLetterIndexes = wordleLetters.get(key);
        const wordleLetterIndex = wordleLetterIndexes?.findIndex((i) => i === letter.index) ?? -1;
        if (wordleLetterIndexes && wordleLetterIndex > -1) {
          letter.state = 'right';
          wordleLetterIndexes?.splice(wordleLetterIndex, 1);
          wordleLetters.set(key, wordleLetterIndexes);
          return;
        }
      });
    });

    //loop to tag 'partial' or 'unused' letters & to set backgrounds
    guessLetters.forEach((guessLetter, key) => {
      guessLetter.forEach((letter) => {
        if (letter.state === '') {
          const wordleLetterIndexes = wordleLetters.get(key);
          if (wordleLetterIndexes?.length ?? 0 > 0) {
            letter.state = 'partial';
            wordleLetterIndexes?.pop();
            wordleLetters.set(key, wordleLetterIndexes ?? []);
          } else {
            letter.state = 'unused';
          }
        }

        letter.boardBox?.setBackground(letter.state);
        this._keyboardServ.setKeyBg(key ?? '', letter.state);
      });
    });

    if (currentGuess === wordle) {
      boardGame.success = true;
      boardGame.end = true;
    }

    boardGame.incrementCurrentActiveBoardLine();
    if (boardGame.end) {
      setTimeout(() => {
        this._router.navigate(['/resultat']);
      }, wordle.length * 375);
    }
    this.boardGame$.next(boardGame);
  }

  setWordle(): Wordle | null {
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
    return new Wordle({
      date: date.toLocaleDateString('fr-FR'),
      text,
      serie,
      difficulty,
      imgPath,
      fullname
    });
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
