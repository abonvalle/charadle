import { Injectable } from '@angular/core';
import { BoardGame } from '../../../models/boardgame';
import { defaultSettings } from '../../../models/default-settings';
import { PaintJoker, PlaceLetterJoker, SerieJoker } from '../../../models/joker';
import { Keyboard } from '../../../models/keyboard';
import { localStorageKeys } from '../../../models/local-storage-keys.enum';
import { settings } from '../../../models/settings.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class APIService {
  constructor(private _localStorage: LocalStorageService) {}
  /** GameBoard  */
  getBoardgame(wordle: string, wordleDate: string): BoardGame {
    const strBg = this._localStorage.read(localStorageKeys.boardgame);
    const boardgame = strBg ? (JSON.parse(strBg, this._reviver) as BoardGame) : null;
    return boardgame
      ? new BoardGame({
          boxCount: boardgame.boxCount,
          currentActiveBoardLine: boardgame.currentActiveBoardLine,
          boardLines: boardgame.boardLines,
          wordleDate
        })
      : new BoardGame({ boxCount: wordle.length, wordleDate });
  }
  setBoardgame(gb: BoardGame): void {
    this._localStorage.update(localStorageKeys.boardgame, JSON.stringify(gb, this._replacer));
  }
  deleteBoardgame(): void {
    this._localStorage.delete(localStorageKeys.boardgame);
  }

  /** PaintJoker  */
  getPaintJoker(wordle: string): PaintJoker {
    const strPaintJoker = this._localStorage.read(localStorageKeys.paintJoker);
    const paintJoker = strPaintJoker ? JSON.parse(strPaintJoker) : null;
    return new PaintJoker({
      wordle: paintJoker?.wordle ?? wordle,
      useCount: paintJoker?.useCount,
      maxUse: paintJoker?.maxUse,
      letters: paintJoker?.letters
    });
  }
  setPaintJoker(joker: PaintJoker): void {
    this._localStorage.update(localStorageKeys.paintJoker, JSON.stringify(joker));
  }
  deletePaintJoker(): void {
    this._localStorage.delete(localStorageKeys.paintJoker);
  }
  /** PlaceLetterJoker  */
  getPlaceLetterJoker(wordle: string): PlaceLetterJoker {
    const strPlaceLetterJoker = this._localStorage.read(localStorageKeys.placeLetterJoker);
    const placeLetterJoker = strPlaceLetterJoker ? JSON.parse(strPlaceLetterJoker) : null;
    return new PlaceLetterJoker({
      wordle: placeLetterJoker?.wordle ?? wordle,
      useCount: placeLetterJoker?.useCount,
      maxUse: placeLetterJoker?.maxUse,
      letters: placeLetterJoker?.letters
    });
  }
  setPlaceLetterJoker(joker: PlaceLetterJoker): void {
    this._localStorage.update(localStorageKeys.placeLetterJoker, JSON.stringify(joker));
  }
  deletePlaceLetterJoker(): void {
    this._localStorage.delete(localStorageKeys.placeLetterJoker);
  }

  /** SerieJoker  */
  getSerieJoker(): SerieJoker {
    const strSerieJoker = this._localStorage.read(localStorageKeys.serieJoker);
    const serieJoker = strSerieJoker ? JSON.parse(strSerieJoker) : null;
    return new SerieJoker({
      useCount: serieJoker?.useCount,
      serieName: serieJoker?.serieName
    });
  }
  setSerieJoker(joker: SerieJoker): void {
    this._localStorage.update(localStorageKeys.serieJoker, JSON.stringify(joker));
  }
  deleteSerieJoker(): void {
    this._localStorage.delete(localStorageKeys.serieJoker);
  }

  /** Keyboard  */
  getKeyboard(): Keyboard {
    const strKb = this._localStorage.read(localStorageKeys.keyboard);
    const keyboard = strKb ? (JSON.parse(strKb) as Keyboard) : null;
    return keyboard ? new Keyboard(keyboard.config, keyboard.keyboard) : new Keyboard('AZERTY');
  }
  setKeyboard(kb: Keyboard): void {
    this._localStorage.update(localStorageKeys.keyboard, JSON.stringify(kb));
  }
  deleteKeyboard(): void {
    this._localStorage.delete(localStorageKeys.keyboard);
  }

  /** settings */
  getSettings(): settings {
    const strSettings = this._localStorage.read(localStorageKeys.settings);
    const settings = strSettings ? (JSON.parse(strSettings) as settings) : null;
    return settings ?? defaultSettings;
  }
  setSettings(settings: settings): void {
    this._localStorage.update(localStorageKeys.settings, JSON.stringify(settings));
  }
  deleteSettings(): void {
    this._localStorage.delete(localStorageKeys.settings);
  }

  /** Delete all */
  deleteAll(): void {
    this.deleteBoardgame();
    this.deleteKeyboard();
    this.deletePaintJoker();
    this.deletePlaceLetterJoker();
    this.deleteSerieJoker();
    this.deleteSettings();
  }

  /** Utils */
  private _replacer(_key: string, value: Map<unknown, unknown>) {
    if (value instanceof Map) {
      return {
        dataType: 'Map',
        value: Array.from(value.entries()) // or with spread: value: [...value]
      };
    } else {
      return value;
    }
  }
  private _reviver(_key: string, value: replacer) {
    if (typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value);
      }
    }
    return value;
  }
}

interface replacer {
  dataType: string;
  value: Iterable<[unknown, unknown]>;
}
