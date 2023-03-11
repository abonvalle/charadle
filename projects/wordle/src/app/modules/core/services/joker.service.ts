import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PaintJoker, PlaceLetterJoker, SerieJoker } from '../../../models/joker';

@Injectable({ providedIn: 'root' })
export class JokerService {
  wordle$: BehaviorSubject<string> = new BehaviorSubject('');
  /**🃏x0 => 🖌️x3 */
  joker1$: BehaviorSubject<PaintJoker> = new BehaviorSubject(new PaintJoker());
  /**🔤x3 */
  joker2$: BehaviorSubject<PlaceLetterJoker> = new BehaviorSubject(new PlaceLetterJoker());
  /**🎥x1 */
  joker3$: BehaviorSubject<SerieJoker> = new BehaviorSubject(new SerieJoker());
  constructor() {}
  initJokers(wordle: string) {
    this.wordle$.next(wordle);
    this._setJokers(wordle);
  }
  private _setJokers(_wordle: string) {
    // const initPaintJoker = this._apiServ.getPaintJoker(wordle);
    // const initPlaceLetterJoker = this._apiServ.getPlaceLetterJoker(wordle);
    // const initSerieJoker = this._apiServ.getSerieJoker();
    // this.joker1$.next(initPaintJoker);
    // this.joker2$.next(initPlaceLetterJoker);
    // this.joker3$.next(initSerieJoker);
    // this._apiServ.setPaintJoker(initPaintJoker);
    // this._apiServ.setPlaceLetterJoker(initPlaceLetterJoker);
    // this._apiServ.setSerieJoker(initSerieJoker);
  }

  // useJoker1() {
  //   const jok = this.joker1$.value;
  //   let letter;
  //   do {
  //     letter = jok.use();
  //     console.warn(letter, this._keyboardService.hasLetterStates(letter ?? '', ['partial', 'right']));
  //   } while (letter != null && this._keyboardService.hasLetterStates(letter, ['partial', 'right']));
  //   if (!letter) {
  //     return;
  //   }
  //   jok.incrementUse();
  //   this.joker1$.next(jok);
  //   this._apiServ.setPaintJoker(jok);
  //   this._keyboardService.setKeyBg(letter, 'partial');
  // }

  // useJoker2() {
  //   const jok = this.joker2$.value;
  //   let letter;
  //   do {
  //     letter = jok.use();
  //     console.warn(letter, this._keyboardService.hasLetterStates(letter?.letter ?? '', ['right']));
  //   } while (letter != null && this._keyboardService.hasLetterStates(letter?.letter, ['right']));
  //   if (!letter) {
  //     return;
  //   }
  //   jok.incrementUse();
  //   this.joker2$.next(jok);
  //   this._apiServ.setPlaceLetterJoker(jok);
  //   this._keyboardService.setKeyBg(letter?.letter, 'right');
  // }

  // useJoker3() {
  //   const jok = this.joker3$.value;
  //   jok.use();
  //   this.joker3$.next(jok);
  //   this._apiServ.setSerieJoker(jok);
  // }
}
