import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as charactersInfosJSON from '@editor-assets-series/jsons/characters.json';
import wordlesJSON from '@editor-assets-series/jsons/w1-3.json';
import wordsJSON from '@editor-assets-series/jsons/words.json';
import { BoardGame, keyboardKeyBackground } from '@editor-models/*';
import { BehaviorSubject, Subject } from 'rxjs';
import { Wordle } from '../../../models/wordle.model';
import { SnackbarService } from './snackbar.service';

@Injectable({ providedIn: 'root' })
export class GameService implements OnDestroy {
  boardGame$: BehaviorSubject<BoardGame | null> = new BehaviorSubject<BoardGame | null>(null);
  destroy$: Subject<void> = new Subject();
  constructor(private _snackbarService: SnackbarService, private _router: Router) {}
  ngOnDestroy(): void {
    this.destroy$?.next();
    this.destroy$?.unsubscribe();
  }
  initBoardGame(): void {
    const wordle = this.setWordle();
    console.warn(wordle);
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
    if (!words.includes(currentGuess)) {
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
    const wordles = wordlesJSON;
    const ind =
      12 * (numerodujour - 1) + numerodumois + (Math.pow(numerodujour, 2) + 1 * numerodujour) / 2 + 868 * numeroannee;
    const text = wordles[ind - 1] ?? '';
    const charactersInfos = charactersInfosJSON as {
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
