import { Injectable } from '@angular/core';
import { APIService } from '@core/services/api.service';
import { BehaviorSubject } from 'rxjs';
import { keyboard, keyboardAzerty, keyboardQwerty, keyboardType } from '../../../models';

@Injectable({ providedIn: 'root' })
export class KeyboardService {
  keyboard$: BehaviorSubject<keyboard> = new BehaviorSubject(keyboardAzerty);
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
    this.keyboard$.next(keyboard);
  }
  updateKeyboard(kbType: keyboardType): void {
    this._apiServ.setKeyboardType(kbType);
    this.setKeyboard();
  }
}
