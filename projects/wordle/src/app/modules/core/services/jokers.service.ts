import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Joker, placeLetterJokerLetter } from '../../../models/joker';
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
  ) {}
  useJoker(joker: Joker): void {
    console.warn(joker);
  }
  useJoker1(): void {
    const bg = this._gameService.boardGame$.value;
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
    this._gameService.boardGame$.next(bg);
  }

  useJoker2(): void {
    const bg = this._gameService.boardGame$.value;
    const jok = bg?.jokers.placeLetterJoker;
    let letter: placeLetterJokerLetter | null;
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
    bg.boardLines.forEach((bl) => {
      bl.boardBoxes.forEach((bb) => {
        if (bb.index === letter?.index) {
          bb.before = letter?.letter;
        }
      });
    });
    this._gameService.boardGame$.next(bg);
  }

  useJoker3(): void {
    const bg = this._gameService.boardGame$.value;
    const jok = bg?.jokers.serieJoker;
    if (!jok || bg?.success) {
      return;
    }
    const serie = jok.use();
    if (!serie) {
      this._snackbarService.openSnackBar(jok.soldOut ? 'Joker épuisé' : '');
      return;
    }
    jok.incrementUse();
    this._gameService.boardGame$.next(bg);
  }
}
