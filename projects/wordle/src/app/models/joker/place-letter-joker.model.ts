import { Joker } from './joker.model';
export interface placeLetterJokerLetter {
  letter: string;
  index: number;
}
export interface placeLetterJokerArgs {
  maxUse?: number;
  useCount?: number;
  letters?: placeLetterJokerLetter[];
}
export class PlaceLetterJoker extends Joker {
  letters: placeLetterJokerLetter[];
  constructor(args?: placeLetterJokerArgs) {
    super(args);
    this.letters = args?.letters ?? [];
  }
  use(wordle: string): placeLetterJokerLetter | null {
    if (!this.incrementUse()) {
      return null;
    }
    let letter;
    do {
      letter = this.getRandomLetterFrom(wordle);
    } while (this.letters.map((l) => l.letter).includes(letter.letter));
    this.letters.push(letter);
    return letter;
  }
  getRandomLetterFrom(text: string): placeLetterJokerLetter {
    const randInd = Math.floor(Math.random() * text.length);
    return { letter: text[randInd] ?? '', index: randInd };
  }
}
