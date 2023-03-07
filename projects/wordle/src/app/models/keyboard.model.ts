import { keyboardConfig } from './keyboard-config.interface';
import { keyboardKeyBackground } from './keyboard-key-background-letter';
import { keyboard } from './keyboard.interface';

export class Keyboard {
  keyboard: keyboard;

  constructor(config: keyboardConfig) {
    const keyboard: keyboard = {
      1: [],
      2: [],
      3: []
    };

    for (let row in config) {
      const rowIndex = parseInt(row);

      if (!isNaN(rowIndex)) {
        const letters = config[rowIndex];

        letters?.forEach((letter) => {
          keyboard[rowIndex]?.push({
            letter,
            state: 'none',
            classes: ''
          });
        });
      }
    }
    this.keyboard = keyboard;
  }
  setKeyState(key: string, state: keyboardKeyBackground): void {
    for (let row in this.keyboard) {
      const rowIndex = parseInt(row);

      if (!isNaN(rowIndex)) {
        const letters = this.keyboard[rowIndex];

        letters?.map((letter) => {
          if (letter.letter !== key || letter.state === 'right' || letter.state === 'unused') {
            return;
          }
          if (letter.state === 'partial' && state !== 'right') {
            return;
          }
          letter.classes = `bg-${state}/80`;
        });
      }
    }
  }
}
