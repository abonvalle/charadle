import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Joker, PaintJoker, PlaceLetterJoker, SerieJoker } from '../../../models/joker';
import { Wordle } from '../../../models/wordle.model';
import { APIService } from './api.service';
import { KeyboardService } from './keyboard.service';
import { SnackbarService } from './snackbar.service';
@Injectable({ providedIn: 'root' })
export class JokersService implements OnDestroy {
  paintJoker$: BehaviorSubject<PaintJoker | null> = new BehaviorSubject<PaintJoker | null>(null);
  placeLetterJoker$: BehaviorSubject<PlaceLetterJoker | null> = new BehaviorSubject<PlaceLetterJoker | null>(null);
  serieJoker$: BehaviorSubject<SerieJoker | null> = new BehaviorSubject<SerieJoker | null>(null);
  private _wordle: Wordle | null = null;
  private _destroy$: Subject<void> = new Subject();
  constructor(
    private _apiServ: APIService,
    private _keyboardServ: KeyboardService,
    private _snackbarService: SnackbarService
  ) {}
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }
  initJokers(wordle: Wordle, fetchStoredData: boolean): void {
    let initPaintJoker: PaintJoker;
    let initPlaceLetterJoker: PlaceLetterJoker;
    let initSerieJoker: SerieJoker;
    if (fetchStoredData) {
      initPaintJoker = new PaintJoker({ difficulty: wordle.difficulty, uses: this._apiServ.getPaintJoker()?.uses });
      initPlaceLetterJoker = new PlaceLetterJoker({
        difficulty: wordle.difficulty,
        uses: this._apiServ.getPlaceLetterJoker()?.uses
      });
      initSerieJoker = new SerieJoker({ uses: this._apiServ.getSerieJoker()?.uses });
    } else {
      initPaintJoker = new PaintJoker({ difficulty: wordle.difficulty });
      initPlaceLetterJoker = new PlaceLetterJoker({ difficulty: wordle.difficulty });
      initSerieJoker = new SerieJoker();
    }

    this.paintJoker$ = new BehaviorSubject<PaintJoker | null>(initPaintJoker);
    this.placeLetterJoker$ = new BehaviorSubject<PlaceLetterJoker | null>(initPlaceLetterJoker);
    this.serieJoker$ = new BehaviorSubject<SerieJoker | null>(initSerieJoker);
    this._wordle = wordle;

    for (let i = 0; i < initPaintJoker.useCount; i++) {
      const letter = initPaintJoker.uses[i] ?? '';
      this._keyboardServ.setKeyBg(letter, 'partial');
    }
    for (let i = 0; i < initPlaceLetterJoker.useCount; i++) {
      const letter = initPlaceLetterJoker.uses[i]?.letter ?? '';
      this._keyboardServ.setKeyBg(letter, 'right');
    }
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
    const jok = this.paintJoker$.value;
    if (!jok) {
      return;
    }
    if (jok.soldOut) {
      this._snackbarService.openSnackBar('Joker épuisé 🥲');
      return;
    }
    const letters = this._shuffle(this._wordle?.text?.split('#')[0] ?? '');
    for (let letter of letters) {
      if (this._keyboardServ.hasLetterStates(letter.letter, ['partial', 'right'])) {
        continue;
      }
      jok.use(letter.letter);
      this._keyboardServ.setKeyBg(letter.letter, 'partial');
      this.paintJoker$.next(jok);
      return;
    }
    this._snackbarService.openSnackBar('Toutes les lettres sont découvertes 🤨');
    return;
  }

  private _usePlaceLetterJoker(): void {
    const jok = this.placeLetterJoker$.value;
    if (!jok) {
      return;
    }
    if (jok.soldOut) {
      this._snackbarService.openSnackBar('Joker épuisé 🥲');
      return;
    }
    const letters = this._shuffle(this._wordle?.text?.split('#')[0] ?? '');
    for (let letter of letters) {
      if (this._keyboardServ.hasLetterStates(letter.letter, ['right'])) {
        continue;
      }
      jok.use(letter);
      this._keyboardServ.setKeyBg(letter.letter, 'right');
      this.placeLetterJoker$.next(jok);
      return;
    }
    this._snackbarService.openSnackBar('Toutes les lettres sont découvertes 🤨');
    return;
  }

  private _useSerieJoker(): void {
    const jok = this.serieJoker$.value;
    if (!jok) {
      return;
    }
    if (!jok.use()) {
      this._snackbarService.openSnackBar('Joker épuisé 🥲');
      return;
    }
    this.serieJoker$.next(jok);
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
