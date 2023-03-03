export class BoardBox {
  index: number;
  letter: string;
  background: string;
  isActive: boolean;
  boxSize: number;
  constructor(index: number, boxSize: number, text?: string) {
    this.index = index;
    this.boxSize = boxSize;
    this.letter = text ?? '';
    this.background = '';
    this.isActive = false;
  }
  updateLetter(letter: string): void {
    this.letter = letter;
  }
}
