import { keyboardKeyBackground } from '../keyboard';

export interface boardBoxArgs {
  index: number;
  letter?: string;
  background?: keyboardKeyBackground;
  isActive?: boolean;
  boxSize: number;
}
export class BoardBox {
  index: number;
  letter: string;
  background: keyboardKeyBackground;
  isActive: boolean;
  boxSize: number;
  constructor(args: boardBoxArgs) {
    this.index = args.index;
    this.boxSize = args.boxSize;
    this.letter = args.letter ?? '';
    this.background = args.background ?? 'none';
    this.isActive = args.isActive ?? false;
  }
  updateLetter(letter: string): void {
    this.letter = letter;
  }
  setActive(isActive: boolean): void {
    this.isActive = isActive;
  }
  setBackground(bg: keyboardKeyBackground): void {
    this.background = bg;
  }
}
