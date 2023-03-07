import { Injectable } from '@angular/core';
import { APIService } from '@core/services/api.service';
import { BehaviorSubject } from 'rxjs';
import { Keyboard, keyboardAzerty, keyboardKeyBackground, keyboardQwerty, keyboardType } from '../../../models';

@Injectable({ providedIn: 'root' })
export class KeyboardService {
  keyboard$: BehaviorSubject<Keyboard> = new BehaviorSubject(new Keyboard(keyboardAzerty));
  constructor(private _apiServ: APIService) {}

  setKeyboard(): void {
    let keyboard;
    switch (this._apiServ.getKeyboardType()) {
      case 'QWERTY':
        keyboard = keyboardQwerty;
        break;
      case 'AZERTY':
      default:
        keyboard = keyboardAzerty;
    }
    this.keyboard$.next(new Keyboard(keyboard));
  }
  updateKeyboard(kbType: keyboardType): void {
    this._apiServ.setKeyboardType(kbType);
    this.setKeyboard();
  }
  setKeyBg(key: string, bg: keyboardKeyBackground): void {
    const kb = this.keyboard$.value;
    if (!kb) {
      return;
    }
    kb.setKeyState(key, bg);
    this.keyboard$.next(kb);
  }
}
