import { Injectable } from '@angular/core';
import { BoardGame, boardgameJokers } from '../../../models/boardgame';
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
  /** GameBoard  */
  getBoardgame(): BoardGame | null {
    const strBg = this._localStorage.read(localStorageKeys.boardgame);
    const boardgame = strBg ? (JSON.parse(strBg, this._reviver) as BoardGame) : null;
    return boardgame
      ? new BoardGame({
          currentActiveBoardLine: boardgame.currentActiveBoardLine,
          boardLines: boardgame.boardLines,
          wordle: boardgame.wordle,
          end: boardgame.end,
          success: boardgame.success
        })
      : null;
  }
  setBoardgame(gb: BoardGame): void {
    this._localStorage.update(localStorageKeys.boardgame, JSON.stringify(gb, this._replacer));
  }
  deleteBoardgame(): void {
    this._localStorage.delete(localStorageKeys.boardgame);
  }

  /** Jokers  */
  getJokers(wordle: Wordle): boardgameJokers | null {
    const difficulty = wordle.difficulty;
    const strJk = this._localStorage.read(localStorageKeys.jokers);
    const jokers = strJk ? (JSON.parse(strJk) as boardgameJokers) : null;
    return jokers
      ? {
          paintJoker: new PaintJoker({ difficulty, uses: jokers.paintJoker.uses }),
          placeLetterJoker: new PlaceLetterJoker({
            difficulty,
            uses: jokers.placeLetterJoker.uses
          }),
          serieJoker: new SerieJoker({ uses: jokers.serieJoker.uses })
        }
      : null;
  }
  setJokers(jokers: boardgameJokers): void {
    this._localStorage.update(localStorageKeys.jokers, JSON.stringify(jokers));
  }
  deleteJokers(): void {
    this._localStorage.delete(localStorageKeys.jokers);
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
  getTheme(): string {
    return this._localStorage.read(localStorageKeys.theme) as string;
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
