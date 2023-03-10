import { Injectable } from '@angular/core';
import { APIService } from '@core/services/api.service';
import { BehaviorSubject } from 'rxjs';
import { key, Keyboard, keyboardKeyBackground, keyboardType } from '../../../models';

@Injectable({ providedIn: 'root' })
export class KeyboardService {
  keyboard$: BehaviorSubject<Keyboard> = new BehaviorSubject(new Keyboard('AZERTY'));
  constructor(private _apiServ: APIService) {}

  setKeyboard(): void {
    // this.keyboard$.value?.updateConfig(this._apiServ.getKeyboardType());
    const kb = this._apiServ.getKeyboard();
    this.keyboard$.next(kb);
    this._apiServ.setKeyboard(kb);
  }
  updateKeyboardType(kbType: keyboardType): void {
    const kb = this.keyboard$.value;
    kb.config = kbType;
    this.keyboard$.next(kb);
    this._apiServ.setKeyboard(kb);
  }
  setKeyBg(key: string, bg: keyboardKeyBackground): void {
    // this.keyboard$.value?.setKeyState(key, bg);
    const kb = this.keyboard$.value;
    if (!kb) {
      return;
    }
    kb.setKeyState(key, bg);
    this.keyboard$.next(kb);
    this._apiServ.setKeyboard(kb);
  }
  hasLetterStates(key: string, states: keyboardKeyBackground[]): boolean {
    const kb = this.keyboard$.value;
    if (!kb) {
      return false;
    }
    return kb.hasLetterStates(key, states);
  }
  getKey(letter: string): key | undefined {
    return this.keyboard$.value.getKey(letter);
  }
}
