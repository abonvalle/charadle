import { keyboardKeyBackground } from '../keyboard';

export interface boardBoxArgs {
  index: number;
  letter?: string;
  background?: keyboardKeyBackground;
  isActive?: boolean;
  boxSize: number;
  before?: string;
  classes?: string[];
}
export class BoardBox {
  index: number;
  letter: string;
  background: keyboardKeyBackground;
  isActive: boolean;
  boxSize: number;
  before: string;
  classes: string[];
  constructor(args: boardBoxArgs) {
    this.index = args.index;
    this.boxSize = args.boxSize;
    this.letter = args.letter ?? '';
    this.before = args.before ?? '';
    this.background = args.background ?? 'none';
    this.isActive = args.isActive ?? false;
    this.classes = args.classes ?? [];
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
