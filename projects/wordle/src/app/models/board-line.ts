import { BoardBox } from './board-box';

export class BoardLine {
  index: number;
  isActive: boolean;
  boxCount: number;
  boardBoxes: Map<number, BoardBox>;
  text: string;
  constructor(index: number, boxCount: number, text?: string) {
    this.index = index;
    this.isActive = false;
    this.boxCount = boxCount;
    this.text = text ?? '';
    this.boardBoxes = this._setBoardBoxes(boxCount, text);
  }
  private _setBoardBoxes(boxCount: number, text?: string): Map<number, BoardBox> {
    const boardLines = new Map();
    for (let i = 0; i < boxCount; i++) {
      const letters = text?.split('') ?? [];
      const letter = letters[i];
      boardLines.set(i, new BoardBox(i, this._getBoxSize(boxCount), letter));
    }
    return boardLines;
  }
  private _getBoxSize(boxCount: number): number {
    switch (boxCount) {
      case 2:
      case 3:
      case 4:
        return 20;
      case 5:
        return 16;
      case 6:
        return 14;
      case 7:
      case 8:
      case 9:
        return 12;
      case 10:
        return 10;
      case 11:
      case 12:
      default:
        return 8;
    }
  }
  addLetter(letter: string): void {
    this.text = this.text + letter;
    const box = this.boardBoxes.get(this.text.length - 1);
    box?.updateLetter(letter);
  }
  removeLetter(): void {
    this.text = this.text.slice(0, this.text.length - 1);
    console.warn(this.text);
    const box = this.boardBoxes.get(this.text.length);
    box?.updateLetter('');
  }
}
