import { PaintJoker, PlaceLetterJoker, SerieJoker } from '../joker';
import { Wordle } from '../wordle.model';
import { BoardLine } from './board-line';
export interface boardgameJokers {
  paintJoker: PaintJoker;
  placeLetterJoker: PlaceLetterJoker;
  serieJoker: SerieJoker;
}
export interface boardGameArgs {
  boardLines?: Map<number, BoardLine>;
  currentActiveBoardLine?: number;
  wordle: Wordle;
  jokers?: boardgameJokers;
  success?: boolean;
  end?: boolean;
}
export class BoardGame {
  boardLines: Map<number, BoardLine>;
  currentActiveBoardLine: number;
  wordle: Wordle;
  jokers: boardgameJokers;
  success?: boolean;
  end?: boolean;
  constructor(args: boardGameArgs) {
    this.currentActiveBoardLine = args.currentActiveBoardLine ?? 0;
    this.jokers = args.jokers ? this._setJokers(args.jokers) : this._initJokers(args.wordle);
    this.wordle = args.wordle;
    this.success = args.success ?? false;
    this.end = args.end ?? false;
    this.boardLines = this._setBoardLines(args.wordle.length, args.boardLines);
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
  private _setJokers(jokers: boardgameJokers): boardgameJokers {
    const paintJoker = new PaintJoker({
      // letters: jokers.paintJoker.letters,
      // useCount: jokers.paintJoker.useCount,
      maxUse: jokers.paintJoker.maxUse,
      uses: jokers.paintJoker.uses
    });
    const placeLetterJoker = new PlaceLetterJoker({
      // letters: jokers.placeLetterJoker.letters,
      // useCount: jokers.placeLetterJoker.useCount,
      maxUse: jokers.placeLetterJoker.maxUse,
      uses: jokers.placeLetterJoker.uses
    });
    const serieJoker = new SerieJoker({
      // serieName: jokers.serieJoker.serieName,
      uses: jokers.serieJoker.uses
      // useCount: jokers.serieJoker.useCount
    });
    return { paintJoker, placeLetterJoker, serieJoker };
  }
  private _initJokers(wordle: Wordle): boardgameJokers {
    const maxUse = this._getMaxUse(wordle.text);
    const paintJoker = new PaintJoker({ maxUse });
    const placeLetterJoker = new PlaceLetterJoker({ maxUse });
    const serieJoker = new SerieJoker();
    return { paintJoker, placeLetterJoker, serieJoker };
  }
  private _getMaxUse(wordle: string): number {
    if (wordle.length < 6) {
      return 3;
    } else if (wordle.length < 9) {
      return 4;
    } else {
      return 5;
    }
  }

  addBoardLine(): void {
    this.boardLines.set(
      this.boardLines.size,
      new BoardLine({ index: this.boardLines.size, boxCount: this.wordle.length })
    );
  }

  incrementCurrentActiveBoardLine(): void {
    const boardLine = this.getCurrentBoardLine();
    boardLine?.setActive(false);
    this.currentActiveBoardLine++;
    const nextBoardLine = this.getCurrentBoardLine();
    if (!nextBoardLine) {
      this.end = true;
    }
    nextBoardLine?.setActive(true);
  }

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
