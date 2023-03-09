import { Injectable } from '@angular/core';
import { APIService } from '@core/services/api.service';
import { BehaviorSubject } from 'rxjs';
import { Keyboard, keyboardKeyBackground, keyboardType } from '../../../models';

@Injectable({ providedIn: 'root' })
export class KeyboardService {
  keyboard$: BehaviorSubject<Keyboard> = new BehaviorSubject(new Keyboard('AZERTY'));
  constructor(private _apiServ: APIService) {}

  setKeyboard(): void {
    // this.keyboard$.value?.updateConfig(this._apiServ.getKeyboardType());
    const kb = this.keyboard$.value;
    if (!kb) {
      return;
    }
    kb.updateConfig(this._apiServ.getKeyboardType());
    this.keyboard$.next(kb);
  }
  updateKeyboard(kbType: keyboardType): void {
    this._apiServ.setKeyboardType(kbType);
    this.setKeyboard();
  }
  setKeyBg(key: string, bg: keyboardKeyBackground): void {
    // this.keyboard$.value?.setKeyState(key, bg);
    const kb = this.keyboard$.value;
    if (!kb) {
      return;
    }
    kb.setKeyState(key, bg);
    this.keyboard$.next(kb);
  }
  hasLetterStates(key: string, states: keyboardKeyBackground[]): boolean {
    const kb = this.keyboard$.value;
    if (!kb) {
      return false;
    }
    return kb.hasLetterStates(key, states);
  }
}
