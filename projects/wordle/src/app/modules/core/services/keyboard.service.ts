import { Injectable } from '@angular/core';
import { APIService } from '@core/services/api.service';
import { BehaviorSubject } from 'rxjs';
import { BoardLine, Keyboard, Wordle, key, keyboardType, letterState } from '../../../models';

@Injectable({ providedIn: 'root' })
export class KeyboardService {
  keyboard$: BehaviorSubject<Keyboard> = new BehaviorSubject(new Keyboard('AZERTY'));
  constructor(private _apiServ: APIService) {}
  initKeyBoard(boardLines: BoardLine[], wordle: Wordle): void {
    const kb = this._apiServ.getKeyboard();
    boardLines.forEach((bl) => {
      if (bl.isActive) {
        return;
      }
      bl.text.split('').forEach((letter, index) => {
        let state: letterState = 'none';
        if (wordle.text.includes(letter)) {
          state = wordle.text[index] === letter ? 'right' : 'partial';
        } else {
          state = 'unused';
        }
        kb.setKeyState(letter, state);
      });
    });

    this.keyboard$.next(kb);
  }
  setKeyboard(): void {
    // this.keyboard$.value?.updateConfig(this._apiServ.getKeyboardType());
    // const kb = this._apiServ.getKeyboard();
    // this.keyboard$.next(kb);
    // this._apiServ.setKeyboard(kb.config);
  }
  updateKeyboardType(kbType: keyboardType): void {
    const kb = this.keyboard$.value;
    kb.config = kbType;
    this.keyboard$.next(kb);
    this._apiServ.setKeyboard(kb.config);
  }
  setKeyBg(key: string, bg: letterState): void {
    // this.keyboard$.value?.setKeyState(key, bg);
    const kb = this.keyboard$.value;
    if (!kb) {
      return;
    }
    kb.setKeyState(key, bg);
    this.keyboard$.next(kb);
  }
  hasLetterStates(key: string, states: letterState[]): boolean {
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
