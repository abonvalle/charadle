import { BoardBox } from './board-box';

export class BoardLine {
  index: number;
  isActive: boolean;
  boxCount: number;
  boardBoxes: Map<number, BoardBox>;
  text: string;
  constructor(index: number, boxCount: number, isActive?: boolean, text?: string) {
    this.index = index;
    this.isActive = isActive ?? false;
    this.boxCount = boxCount;
    this.text = text ?? '';
    this.boardBoxes = this._setBoardBoxes(boxCount, text);
  }
  private _setBoardBoxes(boxCount: number, text?: string): Map<number, BoardBox> {
    const boardLines = new Map();
    let isBoxActivePassed = false;
    for (let i = 0; i < boxCount; i++) {
      let isBoxActive = false;
      const letters = text?.split('') ?? [];
      const letter = letters[i];
      if (!isBoxActivePassed && !letters[i] && this.isActive) {
        isBoxActivePassed = true;
        isBoxActive = true;
      }
      boardLines.set(i, new BoardBox(i, this._getBoxSize(boxCount), letter, isBoxActive));
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
        return 8;
      case 11:
      case 12:
      default:
        return 8;
    }
  }
  private _setBoxActive(index: number, isActive: boolean): void {
    const box = this.boardBoxes.get(index);
    box?.setActive(isActive);
  }
  addLetter(letter: string): void {
    this.text = this.text + letter;
    const box = this.boardBoxes.get(this.text.length - 1);
    this._setBoxActive(this.text.length - 1, false);
    box?.updateLetter(letter);
    this._setBoxActive(this.text.length, true);
  }
  removeLetter(): void {
    this.text = this.text.slice(0, this.text.length - 1);
    console.warn(this.text);
    const box = this.boardBoxes.get(this.text.length);
    this._setBoxActive(this.text.length, true);
    box?.updateLetter('');
    this._setBoxActive(this.text.length + 1, false);
  }
  setActive(isActive: boolean): void {
    this.isActive = isActive;
    this._setBoxActive(this.text.length, true);
  }
  isBoardLineFull(): boolean {
    return (this.text?.length ?? 0) === this.boxCount;
  }
}
