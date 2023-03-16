import { Injectable } from '@angular/core';
import { BoardGame } from '../../../models/boardgame';
import { defaultSettings } from '../../../models/default-settings';
import { Keyboard } from '../../../models/keyboard';
import { localStorageKeys } from '../../../models/local-storage-keys.enum';
import { settings } from '../../../models/settings.interface';
import { Wordle } from '../../../models/wordle.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class APIService {
  constructor(private _localStorage: LocalStorageService) {}
  /** GameBoard  */
  getBoardgame(wordle: Wordle): BoardGame {
    const strBg = this._localStorage.read(localStorageKeys.boardgame);
    const boardgame = strBg ? (JSON.parse(strBg, this._reviver) as BoardGame) : null;
    return boardgame && boardgame.wordle.date === wordle.date
      ? new BoardGame({
          currentActiveBoardLine: boardgame.currentActiveBoardLine,
          boardLines: boardgame.boardLines,
          wordle,
          jokers: boardgame.jokers,
          success: boardgame.success
        })
      : new BoardGame({ wordle });
  }
  setBoardgame(gb: BoardGame): void {
    this._localStorage.update(localStorageKeys.boardgame, JSON.stringify(gb, this._replacer));
  }
  deleteBoardgame(): void {
    this._localStorage.delete(localStorageKeys.boardgame);
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
