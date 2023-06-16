import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { boardgameJokers } from '../../../models/boardgame';
import { Joker } from '../../../models/joker';
import { Wordle } from '../../../models/wordle.model';
import { KeyboardService } from './keyboard.service';
import { SnackbarService } from './snackbar.service';
@Injectable({ providedIn: 'root' })
export class JokersService {
  jokers$: BehaviorSubject<boardgameJokers | null> = new BehaviorSubject<boardgameJokers | null>(null);
  private _wordle: Wordle | null = null;
  constructor(private _keyboardServ: KeyboardService, private _snackbarService: SnackbarService) {}
  initJokers(wordle: Wordle, initJokers: boardgameJokers) {
    this.jokers$.next(initJokers);
    this._wordle = wordle;
    console.warn(this._wordle);
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
    const joks = this.jokers$.value;
    const jok = joks?.paintJoker;
    if (!jok) {
      return;
    }
    if (jok.soldOut) {
      this._snackbarService.openSnackBar('Joker épuisé');
      return;
    }
    const letters = this._shuffle(this._wordle?.text ?? '');
    for (let letter of letters) {
      if (this._keyboardServ.hasLetterStates(letter.letter, ['partial', 'right'])) {
        continue;
      }
      jok.use(letter.letter);
      this._keyboardServ.setKeyBg(letter.letter, 'partial');
      this.jokers$.next(joks);
      return;
    }
    this._snackbarService.openSnackBar('Toutes les lettres sont découvertes', 'alert');
    return;
  }

  private _usePlaceLetterJoker(): void {
    const joks = this.jokers$.value;
    const jok = joks?.placeLetterJoker;
    if (!jok) {
      return;
    }
    if (jok.soldOut) {
      this._snackbarService.openSnackBar('Joker épuisé');
      return;
    }
    const letters = this._shuffle(this._wordle?.text ?? '');
    for (let letter of letters) {
      if (this._keyboardServ.hasLetterStates(letter.letter, ['right'])) {
        continue;
      }
      jok.use(letter);
      this._keyboardServ.setKeyBg(letter.letter, 'right');
      this.jokers$.next(joks);
      return;
    }
    this._snackbarService.openSnackBar('Toutes les lettres sont découvertes', 'alert');
    return;
  }

  private _useSerieJoker(): void {
    const joks = this.jokers$.value;
    const jok = joks?.serieJoker;
    if (!jok) {
      return;
    }
    if (!jok.use()) {
      this._snackbarService.openSnackBar('Joker épuisé');
      return;
    }
    this.jokers$.next(joks);
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
