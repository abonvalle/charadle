export class BoardBox {
  index: number;
  letter: string;
  background: string;
  isActive: boolean;
  boxSize: number;
  constructor(index: number, boxSize: number, text?: string, isActive?: boolean) {
    this.index = index;
    this.boxSize = boxSize;
    this.letter = text ?? '';
    this.background = '';
    this.isActive = isActive ?? false;
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
