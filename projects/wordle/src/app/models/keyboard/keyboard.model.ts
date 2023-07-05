import { keyboardAzerty } from './keyboard-azerty';
import { keyboardConfig } from './keyboard-config.interface';
import { keyboardKeyBackground } from './keyboard-key-background-letter';
import { keyboardQwerty } from './keyboard-qwerty';
import { keyboardType } from './keyboard-types';
import { key, keyboard } from './keyboard.interface';

export class Keyboard {
  keyboard: keyboard;
  config: keyboardType = 'AZERTY';

  constructor(config: keyboardType | null, oldKeyboard?: keyboard) {
    this.keyboard = this._setKeyboard(config, oldKeyboard);
  }
  private _getKbConfig(config: keyboardType | null): keyboardConfig {
    let kbConfig;
    switch (config) {
      case 'QWERTY':
        kbConfig = keyboardQwerty;
        break;
      case 'AZERTY':
      default:
        kbConfig = keyboardAzerty;
    }
    return kbConfig;
  }
  private _setKeyboard(config: keyboardType | null, oldKeyboard?: keyboard): keyboard {
    const kbConfig = this._getKbConfig(config);
    const keyboard: keyboard = {
      1: [],
      2: [],
      3: []
    };

    for (let row in kbConfig) {
      const rowIndex = parseInt(row);

      if (!isNaN(rowIndex)) {
        const letters = kbConfig[rowIndex];

        letters?.forEach((letter) => {
          let state: keyboardKeyBackground = 'none';
          let classes = '';
          if (oldKeyboard) {
            const oldKey = this.getKey(letter, oldKeyboard);
            state = oldKey?.state ?? 'none';
            classes = oldKey?.classes ?? '';
          }
          keyboard[rowIndex]?.push({
            letter,
            state,
            classes
          });
        });
      }
    }
    return keyboard;
  }
  updateConfig(config: keyboardType): void {
    this._setKeyboard(config, this.keyboard);
  }
  // setKeyboardConfig(): void {
  //   let keyboard;
  //   switch (this._apiServ.getKeyboardType()) {
  //     case 'QWERTY':
  //       keyboard = keyboardQwerty;
  //       break;
  //     case 'AZERTY':
  //     default:
  //       keyboard = keyboardAzerty;
  //   }
  //   this.keyboard$.next(new Keyboard(keyboard));
  // }
  getKey(letter: string, kb?: keyboard): key | undefined {
    let keyboard = kb ?? this.keyboard;
    for (let row in keyboard) {
      const rowIndex = parseInt(row);

      if (!isNaN(rowIndex)) {
        const letters = keyboard[rowIndex];
        let key = letters?.find((l) => l.letter === letter);
        if (key) {
          return key;
        }
      }
    }
    return undefined;
  }
  setKeyState(letter: string, state: keyboardKeyBackground): void {
    const key = this.getKey(letter);
    if (!key) {
      console.error(letter, 'key not found');
      return;
    }
    if (key.letter !== letter) {
      return;
    }

    enum statesEnum {
      'none',
      'unused',
      'partial',
      'right'
    }
    if (statesEnum[key.state] < statesEnum[state]) {
      key.state = state;
      key.classes = `bg-${state}/80 accessibility-${state}`;
    }
  }
  hasLetterStates(letter: string, states: keyboardKeyBackground[]): boolean {
    const key = this.getKey(letter);
    if (!key) {
      return false;
    }
    console.warn(key.state);
    return states.includes(key.state);
  }
}
