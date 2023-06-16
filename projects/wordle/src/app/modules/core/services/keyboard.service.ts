import { Injectable } from '@angular/core';
import { APIService } from '@core/services/api.service';
import { BehaviorSubject } from 'rxjs';
import { BoardGame, boardgameJokers, key, Keyboard, keyboardKeyBackground, keyboardType } from '../../../models';

@Injectable({ providedIn: 'root' })
export class KeyboardService {
  keyboard$: BehaviorSubject<Keyboard> = new BehaviorSubject(new Keyboard('AZERTY'));
  constructor(private _apiServ: APIService) {}
  initKeyBoard(bg: BoardGame, joks: boardgameJokers): void {
    const kb = this._apiServ.getKeyboard();
    bg.boardLines.forEach((bl) => {
      if (bl.isActive) {
        return;
      }
      bl.text.split('').forEach((letter, index) => {
        let state: keyboardKeyBackground = 'none';
        if (bg.wordle.text.includes(letter)) {
          state = bg.wordle.text[index] === letter ? 'right' : 'partial';
        } else {
          state = 'unused';
        }
        kb.setKeyState(letter, state);
      });
    });
    for (let i = 0; i < joks.paintJoker.useCount; i++) {
      const letter = joks.paintJoker.uses[i] ?? '';
      kb.setKeyState(letter, 'partial');
    }
    for (let i = 0; i < joks.placeLetterJoker.useCount; i++) {
      const letter = joks.placeLetterJoker.uses[i]?.letter ?? '';
      kb.setKeyState(letter, 'right');
    }
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
  getKey(letter: string): key | undefined {
    return this.keyboard$.value.getKey(letter);
  }
}
