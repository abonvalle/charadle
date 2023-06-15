import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
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

  private _usePlaceLetterJoker(): void {
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

  private _useSerieJoker(): void {
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
