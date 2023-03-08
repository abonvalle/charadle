import { Joker } from './joker.model';
export interface paintJokerArgs {
  wordle: string;
  maxUse?: number;
  useCount?: number;
  letters?: string[];
}
export class PaintJoker extends Joker {
  letters: string[];
  constructor(args: paintJokerArgs) {
    super(args);
    //todo : set jokers on construct to avoid long random func on joker use
    this.letters = args?.letters ?? [];
  }
  use(wordle: string): string | null {
    if (!this.incrementUse()) {
      return null;
    }
    let letter: string;
    do {
      letter = this.getRandomLetterFrom(wordle);
    } while (this.letters.includes(letter));
    this.letters.push(letter);
    return letter;
  }
  getRandomLetterFrom(text: string): string {
    const randInd = Math.floor(Math.random() * text.length);
    return text[randInd] ?? '';
  }
}
