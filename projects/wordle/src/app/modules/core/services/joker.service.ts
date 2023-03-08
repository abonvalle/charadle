import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PaintJoker, PlaceLetterJoker, SerieJoker } from '../../../models/joker';
import { GameService } from './game.service';
import { KeyboardService } from './keyboard.service';

@Injectable({ providedIn: 'root' })
export class JokerService {
  joker1$: BehaviorSubject<PaintJoker> = new BehaviorSubject(
    new PaintJoker({ wordle: this._gameService.wordle$.value })
  );
  joker2$: BehaviorSubject<PlaceLetterJoker> = new BehaviorSubject(new PlaceLetterJoker());
  joker3$: BehaviorSubject<SerieJoker> = new BehaviorSubject(new SerieJoker());
  // joker1Uses$: BehaviorSubject<jokersUses>;
  // joker2Uses$: BehaviorSubject<jokersUses>;
  // joker3Uses$: BehaviorSubject<jokersUses>;
  jokersUses$: BehaviorSubject<3 | 5>;
  constructor(private _gameService: GameService, private _keyboardService: KeyboardService) {
    // this.joker1Uses$ = new BehaviorSubject<jokersUses>('0');
    // this.joker2Uses$ = new BehaviorSubject<jokersUses>('0');
    // this.joker3Uses$ = new BehaviorSubject<jokersUses>('0');
    this.jokersUses$ = new BehaviorSubject<3 | 5>(3);
    this._setJokerUses();
  }
  private _setJokerUses() {
    this.jokersUses$.next(this._gameService.isDifficult() ? 5 : 3);
  }
  useJoker(joker: number) {
    switch (joker) {
      case 1:
        this.useJoker1();
        break;
      case 2:
        this.useJoker2();
        break;
      case 3:
        this.useJoker3();
        break;
    }
  }

  useJoker1() {
    const jok = this.joker1$.value;
    const letter = jok.use(this._gameService.wordle$.value);
    if (!letter) {
      return;
    }
    this.joker1$.next(jok);
    this._keyboardService.setKeyBg(letter, 'partial');
  }

  useJoker2() {
    const jok = this.joker2$.value;
    const letter = jok.use(this._gameService.wordle$.value);
    if (!letter) {
      return;
    }
    this.joker2$.next(jok);
    //todo : set key
    this._keyboardService.setKeyBg(letter.letter, 'right');
  }

  useJoker3() {
    const jok = this.joker3$.value;
    jok.use();
    this.joker3$.next(jok);
  }
}

export type jokersUses = '1/3' | '2/3' | '1/5' | '2/5' | '3/5' | '4/5' | '0' | 'full';
