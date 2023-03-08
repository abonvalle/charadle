import { BoardLine } from './board-line';

export class BoardGame {
  boardLines: Map<number, BoardLine>;
  currentActiveBoardLine: number;
  boxCount: number;
  constructor(boxCount: number) {
    this.boxCount = boxCount;
    this.boardLines = this._setBoardLines(boxCount);
    this.currentActiveBoardLine = 0;
  }
  private _setBoardLines(boxCount: number): Map<number, BoardLine> {
    const boardLines = new Map();
    for (let i = 0; i < 6; i++) {
      boardLines.set(i, new BoardLine(i, boxCount, i === 0));
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
  // updateLetter(lineIndex: number, letter: string): void {
  //   const boardLine = this.boardLines.get(lineIndex);
  //   if (letter === '') {
  //     boardLine?.removeLetter();
  //     return;
  //   }
  //   if ((boardLine?.text?.length ?? 0) < this.boxCount) {
  //     boardLine?.addLetter(letter);
  //   }
  // const boardBox = boardLine?.boardBoxes.get(boxIndex);
  // boardBox?.updateLetter(letter);
  // this.boardLines.set(this.boardLines.size, new BoardLine(this.boardLines.size, this.boxCount));
  // }
  // addLetter(letter: string): void {
  //   if (!this.isBoardLineFull()) {
  //     const boardLine = this.getCurrentBoardLine();
  //     boardLine?.addLetter(letter);
  //   }
  // }
  // removeLetter(): void {
  //   const boardLine = this.getCurrentBoardLine();
  //   boardLine?.removeLetter();
  //   return;
  // }
  incrementCurrentActiveBoardLine(): void {
    const boardLine = this.getCurrentBoardLine();
    boardLine?.setActive(false);
    this.currentActiveBoardLine++;
    const nextBoardLine = this.getCurrentBoardLine();
    nextBoardLine?.setActive(true);
  }
  // isBoardLineFull(): boolean {
  //   const boardLine = this.getCurrentBoardLine();
  //   return (boardLine?.text?.length ?? 0) === this.boxCount;
  // }
  // getCurrentGuess(): string {
  //   const boardLine = this.getCurrentBoardLine();
  //   return boardLine?.text ?? '';
  // }
  getCurrentBoardLine(): BoardLine | undefined {
    return this.boardLines.get(this.currentActiveBoardLine);
  }
}
