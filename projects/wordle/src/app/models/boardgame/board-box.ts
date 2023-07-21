import { letterState } from '../keyboard';

export interface boardBoxArgs {
  index: number;
  letter?: string;
  background?: letterState;
  isActive?: boolean;
  boxSize: number;
  before?: string;
  classes?: string[];
}
export class BoardBox {
  index: number;
  letter: string;
  background: letterState;
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
  setBackground(bg: letterState): void {
    this.background = bg;
  }
}
