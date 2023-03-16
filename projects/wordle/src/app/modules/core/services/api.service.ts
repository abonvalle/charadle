import { Injectable } from '@angular/core';
import { BoardGame } from '../../../models/boardgame';
import { defaultSettings } from '../../../models/default-settings';
import { Keyboard, keyboardType } from '../../../models/keyboard';
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

  /** Tries  */
  getTries(): string[] {
    const tries = this._localStorage.read(localStorageKeys.tries);
    return tries ? JSON.parse(atob(tries)) : [];
  }
  setTries(tries: string[]): void {
    this._localStorage.update(localStorageKeys.tries, btoa(JSON.stringify(tries)));
  }
  deleteTries(): void {
    this._localStorage.delete(localStorageKeys.tries);
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
