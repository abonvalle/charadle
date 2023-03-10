export interface boardBoxArgs {
  index: number;
  letter?: string;
  background?: string;
  isActive?: boolean;
  boxSize: number;
}
export class BoardBox {
  index: number;
  letter: string;
  background: string;
  isActive: boolean;
  boxSize: number;
  constructor(args: boardBoxArgs) {
    this.index = args.index;
    this.boxSize = args.boxSize;
    this.letter = args.letter ?? '';
    this.background = args.background ?? '';
    this.isActive = args.isActive ?? false;
  }
  updateLetter(letter: string): void {
    this.letter = letter;
  }
  setActive(isActive: boolean): void {
    this.isActive = isActive;
  }
  setBackground(bg: string): void {
    this.background = bg;
  }
}
