import { BoardLine } from './board-line';
export interface boardGameArgs {
  boardLines?: Map<number, BoardLine>;
  currentActiveBoardLine?: number;
  boxCount: number;
  wordleDate: string;
}
export class BoardGame {
  boardLines: Map<number, BoardLine>;
  currentActiveBoardLine: number;
  boxCount: number;
  wordleDate: string;
  constructor(args: boardGameArgs) {
    this.boxCount = args.boxCount;
    this.boardLines = this._setBoardLines(args.boxCount, args.boardLines);
    this.currentActiveBoardLine = args.currentActiveBoardLine ?? 0;
    this.wordleDate = args.wordleDate;
  }
  private _setBoardLines(boxCount: number, oldBoardlines?: Map<number, BoardLine>): Map<number, BoardLine> {
    const boardLines = new Map();
    for (let index = 0; index < 6; index++) {
      let bl;
      if (oldBoardlines) {
        bl = oldBoardlines.get(index);
      }
      boardLines.set(
        index,
        new BoardLine({
          index,
          boxCount,
          isActive: bl?.isActive ?? index === 0,
          text: bl?.text,
          oldBoardBoxes: bl?.boardBoxes
        })
      );
    }
    return boardLines;
  }
  addBoardLine(): void {
    this.boardLines.set(this.boardLines.size, new BoardLine({ index: this.boardLines.size, boxCount: this.boxCount }));
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

  getTries(): string[] {
    const res: string[] = [];
    this.boardLines.forEach((bl) => {
      const bltry = bl.getTry();
      bltry.length && res.push(bltry);
    });
    return res;
  }
}
