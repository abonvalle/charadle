import { Injectable } from '@angular/core';
import { BoardLine } from '../../../models/boardgame';
import { defaultSettings } from '../../../models/default-settings';
import { PaintJoker, PlaceLetterJoker, SerieJoker } from '../../../models/joker';
import { Keyboard, keyboardType } from '../../../models/keyboard';
import { localStorageKeys } from '../../../models/local-storage-keys.enum';
import { settings } from '../../../models/settings.interface';
import { Wordle } from '../../../models/wordle.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class APIService {
  constructor(private _localStorage: LocalStorageService) {}
  /** BoardLines  */
  getBoardLines(): BoardLine[] | null {
    const strBls = this._localStorage.read(localStorageKeys.boardLines);
    const bls = strBls ? (JSON.parse(strBls) as BoardLine[]) : null;
    return bls
      ? bls.map(
          (bl) =>
            new BoardLine({
              index: bl.index,
              boxCount: bl.boxCount,
              oldBoardBoxes: bl.boardBoxes,
              text: bl.text,
              isActive: bl.isActive,
              classes: bl.classes
            })
        )
      : null;
  }
  setBoardLines(bls: BoardLine[]): void {
    this._localStorage.update(localStorageKeys.boardLines, JSON.stringify(bls));
  }
  deleteBoardLines(): void {
    this._localStorage.delete(localStorageKeys.boardLines);
  }

  /** Wordle  */
  getWordle(): Wordle | null {
    const strW = this._localStorage.read(localStorageKeys.wordle);
    const w = strW ? (JSON.parse(strW) as Wordle) : null;
    return w ? w : null;
  }
  setWordle(w: Wordle): void {
    this._localStorage.update(localStorageKeys.wordle, JSON.stringify(w));
  }
  deleteWordle(): void {
    this._localStorage.delete(localStorageKeys.wordle);
  }

  /** Success  */
  getSuccess(): boolean | null {
    const strSuccess = this._localStorage.read(localStorageKeys.success);
    const success = strSuccess ? (JSON.parse(strSuccess) as boolean) : null;
    return success ? success : null;
  }
  setSuccess(success: boolean): void {
    this._localStorage.update(localStorageKeys.success, JSON.stringify(success));
  }
  deleteSuccess(): void {
    this._localStorage.delete(localStorageKeys.success);
  }

  /** End  */
  getEnd(): boolean | null {
    const strEnd = this._localStorage.read(localStorageKeys.end);
    const end = strEnd ? (JSON.parse(strEnd) as boolean) : null;
    return end ? end : null;
  }
  setEnd(end: boolean): void {
    this._localStorage.update(localStorageKeys.end, JSON.stringify(end));
  }
  deleteEnd(): void {
    this._localStorage.delete(localStorageKeys.end);
  }

  /** PaintJokers  */
  getPaintJoker(): PaintJoker | null {
    const strJk = this._localStorage.read(localStorageKeys.paintJoker);
    return strJk ? (JSON.parse(strJk) as PaintJoker) : null;
  }
  setPaintJoker(jokers: PaintJoker): void {
    this._localStorage.update(localStorageKeys.paintJoker, JSON.stringify(jokers));
  }
  deletePaintJoker(): void {
    this._localStorage.delete(localStorageKeys.paintJoker);
  }

  /** PlaceLetterJokers  */
  getPlaceLetterJoker(): PlaceLetterJoker | null {
    const strJk = this._localStorage.read(localStorageKeys.placeLetterJoker);
    return strJk ? (JSON.parse(strJk) as PlaceLetterJoker) : null;
  }
  setPlaceLetterJoker(jokers: PlaceLetterJoker): void {
    this._localStorage.update(localStorageKeys.placeLetterJoker, JSON.stringify(jokers));
  }
  deletePlaceLetterJoker(): void {
    this._localStorage.delete(localStorageKeys.placeLetterJoker);
  }

  /** SerieJokers  */
  getSerieJoker(): SerieJoker | null {
    const strJk = this._localStorage.read(localStorageKeys.serieJoker);
    return strJk ? (JSON.parse(strJk) as SerieJoker) : null;
  }
  setSerieJoker(jokers: SerieJoker): void {
    this._localStorage.update(localStorageKeys.serieJoker, JSON.stringify(jokers));
  }
  deleteSerieJoker(): void {
    this._localStorage.delete(localStorageKeys.serieJoker);
  }

  /** Keyboard  */
  getKeyboard(): Keyboard {
    const strKb = this._localStorage.read(localStorageKeys.keyboard) as keyboardType;
    return new Keyboard(strKb ?? 'AZERTY');
  }
  setKeyboard(kb: keyboardType): void {
    this._localStorage.update(localStorageKeys.keyboard, kb);
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

  /** Theme */
  getTheme(): string | null {
    return this._localStorage.read(localStorageKeys.theme);
  }
  setTheme(theme: string): void {
    this._localStorage.update(localStorageKeys.theme, theme);
  }
  deleteTheme(): void {
    this._localStorage.delete(localStorageKeys.theme);
  }

  /** Delete all */
  deleteAll(): void {
    this._localStorage.clearStorage();
  }
}
