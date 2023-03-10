import { Joker } from './joker.model';
export interface paintJokerArgs {
  wordle: string;
  maxUse?: number;
  useCount?: number;
  letters?: string[];
}
export class PaintJoker extends Joker {
  letters: string[];
  constructor(args?: paintJokerArgs) {
    super(args);
    this.letters = args?.letters ?? this._setLetters(args?.wordle ?? '');
  }
  _setLetters(wordle: string): string[] {
    return this._shuffle(wordle.split(''));
  }
  _shuffle(array: string[]): string[] {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex] ?? '', array[currentIndex] ?? ''];
    }

    return array;
  }
  use(): string | null {
    if (this.soldOut) {
      return null;
    }
    return this.letters.shift() ?? null;
  }
}
