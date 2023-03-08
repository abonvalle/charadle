import { Injectable } from '@angular/core';
import { defaultSettings } from '../../../models/default-settings';
import { keyboardType } from '../../../models/keyboard';
import { localStorageKeys } from '../../../models/local-storage-keys.enum';
import { settings } from '../../../models/settings.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class APIService {
  constructor(private _localStorage: LocalStorageService) {}

  /** Keyboard type */
  getKeyboardType(): keyboardType {
    return (this._localStorage.read(localStorageKeys.keyboard) as keyboardType) ?? 'AZERTY';
  }
  setKeyboardType(kbType: keyboardType): void {
    this._localStorage.update(localStorageKeys.keyboard, kbType);
  }
  deleteKeyboardType(): void {
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
}
