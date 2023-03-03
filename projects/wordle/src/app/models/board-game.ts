import { BoardLine } from './board-line';

export class BoardGame {
  boardLines: Map<number, BoardLine>;
  boxCount: number;
  constructor(boxCount: number) {
    this.boxCount = boxCount;
    this.boardLines = this._setBoardLines(boxCount);
  }
  private _setBoardLines(boxCount: number): Map<number, BoardLine> {
    const boardLines = new Map();
    for (let i = 0; i < 6; i++) {
      boardLines.set(i, new BoardLine(i, boxCount));
    }
    return boardLines;
  }
  addBoardLine(): void {
    this.boardLines.set(this.boardLines.size, new BoardLine(this.boardLines.size, this.boxCount));
  }
  // updateBoardLine(index:number,letter:string): void {
  //   // const boardLine = this.boardLines.get(index)
  //   // const boardBox = boardLine?.boardBoxes.get(index)
  //   // boardLine?.boardBoxes.get(index)
  //   // letter
  //   this.boardLines.set(this.boardLines.size, new BoardLine(this.boardLines.size, this.boxCount));
  // }
  updateLetter(lineIndex: number, letter: string): void {
    const boardLine = this.boardLines.get(lineIndex);
    letter === '' ? boardLine?.removeLetter() : boardLine?.addLetter(letter);
    // const boardBox = boardLine?.boardBoxes.get(boxIndex);
    // boardBox?.updateLetter(letter);
    // this.boardLines.set(this.boardLines.size, new BoardLine(this.boardLines.size, this.boxCount));
  }
}
