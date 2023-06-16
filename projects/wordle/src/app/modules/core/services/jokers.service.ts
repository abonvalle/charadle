import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Joker } from '../../../models/joker';
import { GameService } from './game.service';
import { KeyboardService } from './keyboard.service';
import { SnackbarService } from './snackbar.service';
@Injectable({ providedIn: 'root' })
export class JokersService {
  jokers$: BehaviorSubject<Joker[] | []> = new BehaviorSubject<Joker[] | []>([]);
  constructor(
    private _gameService: GameService,
    private _keyboardServ: KeyboardService,
    private _snackbarService: SnackbarService
  ) {
    this._gameService.boardGame$.pipe(map((bg) => Object.values(bg?.jokers ?? []))).subscribe(this.jokers$);
  }
  useJoker(joker: Joker): void {
    switch (joker.name) {
      case 'paintLetter':
        this._usePaintLetterJoker();
        break;
      case 'placeLetter':
        this._usePlaceLetterJoker();
        break;
      case 'serie':
        this._useSerieJoker();
        break;
    }
  }
  private _usePaintLetterJoker(): void {
    const bg = this._gameService.boardGame$.value;
    const jok = bg?.jokers.paintJoker;
    if (!jok || bg?.success) {
      return;
    }
    if (jok.soldOut) {
      this._snackbarService.openSnackBar('Joker épuisé');
      return;
    }
    const letters = this._shuffle(bg.wordle.text);
    for (let letter of letters) {
      if (this._keyboardServ.hasLetterStates(letter.letter, ['partial', 'right'])) {
        continue;
      }
      jok.use(letter.letter);
      this._keyboardServ.setKeyBg(letter.letter, 'partial');
      this._gameService.boardGame$.next(bg);
      return;
    }
    this._snackbarService.openSnackBar('Toutes les lettres sont découvertes', 'alert');
    return;
  }

  private _usePlaceLetterJoker(): void {
    const bg = this._gameService.boardGame$.value;
    const jok = bg?.jokers.placeLetterJoker;
    if (!jok || bg?.success) {
      return;
    }
    if (jok.soldOut) {
      this._snackbarService.openSnackBar('Joker épuisé');
      return;
    }
    const letters = this._shuffle(bg.wordle.text);
    for (let letter of letters) {
      if (this._keyboardServ.hasLetterStates(letter.letter, ['right'])) {
        continue;
      }
      jok.use(letter);
      this._keyboardServ.setKeyBg(letter.letter, 'right');
      bg.boardLines.forEach((bl) => {
        bl.boardBoxes.forEach((bb) => {
          if (bb.index === letter?.index) {
            bb.before = letter?.letter;
          }
        });
      });
      this._gameService.boardGame$.next(bg);
      return;
    }
    this._snackbarService.openSnackBar('Toutes les lettres sont découvertes', 'alert');
    return;
  }

  private _useSerieJoker(): void {
    const bg = this._gameService.boardGame$.value;
    const jok = bg?.jokers.serieJoker;
    if (!jok || bg?.success) {
      return;
    }
    if (!jok.use()) {
      this._snackbarService.openSnackBar('Joker épuisé');
      return;
    }
    this._gameService.boardGame$.next(bg);
  }

  private _shuffle(text: string): { letter: string; index: number }[] {
    const arr = text.split('');
    let currentIndex = arr.length,
      randomIndex;

    // Create a new array of objects with the letter and index properties
    const newArray = arr.map((letter, index) => ({ letter, index }));

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [newArray[currentIndex], newArray[randomIndex]] = [
        newArray[randomIndex] ?? { letter: '', index: -1 },
        newArray[currentIndex] ?? { letter: '', index: -1 }
      ];
    }

    return newArray;
  }
}
