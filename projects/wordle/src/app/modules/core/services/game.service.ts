import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BoardBox, BoardLine, letterState } from 'projects/wordle/src/app/models';
import { BehaviorSubject, Subject } from 'rxjs';
import { jokers } from '../../../models/joker/jokers.interface';
import { Wordle } from '../../../models/wordle.model';
import { APIService } from './api.service';
import { AssetsService } from './assets.service';
import { EnvironmentService } from './environment.service';
import { JokersService } from './jokers.service';
import { KeyboardService } from './keyboard.service';
import { SnackbarService } from './snackbar.service';

@Injectable({ providedIn: 'root' })
export class GameService implements OnDestroy {
  boardLines$: BehaviorSubject<BoardLine[]>;
  currentActiveBoardLine$: BehaviorSubject<number>;
  wordle$: BehaviorSubject<Wordle>;
  success$: BehaviorSubject<boolean>;
  end$: BehaviorSubject<boolean>;
  destroy$: Subject<void> = new Subject();
  constructor(
    private _snackbarService: SnackbarService,
    private _keyboardServ: KeyboardService,
    private _jokersServ: JokersService,
    private _apiServ: APIService,
    private _router: Router,
    private _assetsServ: AssetsService,
    private _envServ: EnvironmentService
  ) {
    const wordle = this.setWordle();
    let initWordle = this._apiServ.getWordle();
    let initBoardLines = this._apiServ.getBoardLines();
    let initSuccess = this._apiServ.getSuccess();
    let initEnd = this._apiServ.getEnd();
    let jokers: jokers;
    if (initWordle?.date !== wordle.date) {
      initWordle = wordle;
      initBoardLines = null;
      initSuccess = false;
      initEnd = false;
      jokers = this._jokersServ.initJokers(initWordle, false);
    } else {
      initSuccess = initSuccess ?? false;
      initEnd = initEnd ?? false;
      jokers = this._jokersServ.initJokers(initWordle, true);
    }
    const { boardLines, currentActiveBoardLine } = this._setBoardLines(
      initWordle.text.split('#')[0]?.length ?? 0,
      initBoardLines
    );

    this.boardLines$ = new BehaviorSubject<BoardLine[]>(boardLines);
    this.wordle$ = new BehaviorSubject(wordle);
    this.success$ = new BehaviorSubject(initSuccess);
    this.end$ = new BehaviorSubject(initEnd);
    this.currentActiveBoardLine$ = new BehaviorSubject(currentActiveBoardLine);
    this._keyboardServ.initKeyBoard(boardLines, wordle, jokers);
    if (initEnd) {
      this._router.navigate(['/resultat']);
    }
    this._event();
  }
  private _setBoardLines(
    boxCount: number,
    oldBoardlines?: BoardLine[] | null
  ): { boardLines: BoardLine[]; currentActiveBoardLine: number } {
    const boardLines = [];
    let currentActiveBoardLine = 0;
    for (let index = 0; index < 6; index++) {
      let bl;
      if (oldBoardlines) {
        bl = oldBoardlines[index];
      }
      boardLines.push(
        new BoardLine({
          index,
          boxCount,
          isActive: bl?.isActive ?? index === 0,
          text: bl?.text,
          oldBoardBoxes: bl?.boardBoxes
        })
      );
      if (bl?.isActive) {
        currentActiveBoardLine = bl.index;
      }
    }
    return { boardLines, currentActiveBoardLine };
  }
  ngOnDestroy(): void {
    this.destroy$?.next();
    this.destroy$?.unsubscribe();
  }
  initBoardGame(): void {
    const wordle = this.setWordle();
    let initWordle = this._apiServ.getWordle();
    let initBoardLines = this._apiServ.getBoardLines();
    let initSuccess = this._apiServ.getSuccess();
    let initEnd = this._apiServ.getEnd();
    let jokers: jokers;

    if (initWordle?.date !== wordle.date) {
      initWordle = wordle;
      initBoardLines = null;
      initSuccess = false;
      initEnd = false;
      jokers = this._jokersServ.initJokers(initWordle, false);
    } else {
      initSuccess = initSuccess ?? false;
      initEnd = initEnd ?? false;
      jokers = this._jokersServ.initJokers(initWordle, true);
    }
    const { boardLines, currentActiveBoardLine } = this._setBoardLines(
      initWordle.text.split('#')[0]?.length ?? 0,
      initBoardLines
    );

    this.boardLines$.next(boardLines);
    this.wordle$.next(wordle);
    this.success$.next(initSuccess);
    this.end$.next(initEnd);
    this.currentActiveBoardLine$.next(currentActiveBoardLine);
    this._keyboardServ.initKeyBoard(boardLines, wordle, jokers);
    if (initEnd) {
      this._router.navigate(['/resultat']);
    }
  }

  private _event(): void {
    // this._localStrgServ.clear$
    //   .pipe(combineLatestWith(this._envServ.version$), takeUntil(this.destroy$))
    this._envServ.version$.subscribe(() => {
      console.warn('init bg');
      this.initBoardGame();
    });
  }
  getTries(): string[] {
    const res: string[] = [];
    this.boardLines$.value.forEach((bl) => {
      const bltry = bl.getTry();
      bltry.length && res.push(bltry);
    });
    return res;
  }
  addCurrentGuessLetter(letter: string): void {
    let bls = this.boardLines$.value;
    let blInd = this.currentActiveBoardLine$.value;
    const boardLine = bls[blInd];
    if (!boardLine) {
      this._snackbarService.defaultErrorMsg();
      return;
    }
    if (!boardLine.isBoardLineFull()) {
      boardLine.addLetter(letter);
    }
    boardLine.classes =
      boardLine.isBoardLineFull() && !this.checkGuessValidity(boardLine.text) ? ['text-red-500'] : ['text-font'];
    // this.boardGame$.next(boardGame);
    bls[blInd] = boardLine;
    this.boardLines$.next(bls);
  }

  removeLastGuessLetter(): void {
    let bls = this.boardLines$.value;
    let blInd = this.currentActiveBoardLine$.value;
    const boardLine = bls[blInd];
    if (!boardLine) {
      this._snackbarService.defaultErrorMsg();
      return;
    }
    boardLine.removeLetter();
    boardLine.classes = ['text-font'];
    bls[blInd] = boardLine;
    this.boardLines$.next(bls);
  }
  checkGuessValidity(currentGuess: string): boolean {
    const words = this._assetsServ.wordlesJSON$;

    if (!words.includes(currentGuess)) {
      this._snackbarService.showUnkownNameAlert(currentGuess);
      return false;
    }
    return true;
  }
  submitGuess(): void {
    let bls = this.boardLines$.value;
    let blInd = this.currentActiveBoardLine$.value;
    const wordle = this.wordle$.value;
    const boardLine = bls[blInd];
    if (!bls || !boardLine) {
      this._snackbarService.defaultErrorMsg();
      return;
    }
    if (!boardLine.isBoardLineFull()) {
      this._snackbarService.openSnackBar('Pas assez de lettres 🤨', 'alert');
      return;
    }
    const currentGuess = boardLine.text;

    if (!this.checkGuessValidity(currentGuess)) {
      return;
    }
    const wordleText = wordle.text.split('#')[0];
    if (!wordleText) {
      this._snackbarService.defaultErrorMsg();
      return;
    }

    const wordleLetters: Map<string, number[]> = wordleText.split('').reduce((map, letter, index) => {
      map.set(letter, map.has(letter) ? [...map.get(letter), index] : [index]);
      return map;
    }, new Map());

    const guessLetters: Map<string, { index: number; state: letterState; boardBox: BoardBox }[]> = Array.from(
      boardLine.boardBoxes.values()
    ).reduce((map: Map<string, { index: number; state: letterState; boardBox: BoardBox }[]>, boardBox, index) => {
      map.set(
        boardBox.letter,
        map.has(boardBox.letter)
          ? [...(map.get(boardBox.letter) ?? []), { index, state: 'none', boardBox }]
          : [{ index, state: 'none', boardBox }]
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
        if (letter.state === 'none') {
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
        this._keyboardServ.setKeyBg(key, letter.state);
      });
    });

    if (currentGuess === wordleText) {
      this.success$.next(true);
      this.end$.next(true);
    }

    boardLine.setActive(false);
    bls[boardLine.index] = boardLine;
    this.currentActiveBoardLine$.next(this.currentActiveBoardLine$.value + 1);
    const nextBoardLine = bls[this.currentActiveBoardLine$.value];
    if (!nextBoardLine) {
      this.end$.next(true);
    } else {
      nextBoardLine.setActive(true);
      bls[nextBoardLine.index] = nextBoardLine;
    }

    if (this.end$.value) {
      setTimeout(() => {
        this._router.navigate(['/resultat']);
      }, wordle.length * 375);
    }
    this.boardLines$.next(bls);
  }

  setWordle(): Wordle {
    let date = new Date();
    let numerodujour = date.getDate();
    let numerodumois = date.getMonth() + 1;
    let numeroannee = date.getFullYear() - 2022;
    const wordles = this._assetsServ.wordlesJSON$;

    const ind =
      12 * (numerodujour - 1) + numerodumois + (Math.pow(numerodujour, 2) + 1 * numerodujour) / 2 + 868 * numeroannee;
    const text = wordles[ind - 1] ?? '';
    const charactersInfos = this._assetsServ.charactersInfosJSON$ as {
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
    if (this.success$.value) {
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
