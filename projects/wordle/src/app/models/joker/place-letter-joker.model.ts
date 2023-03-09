import { Joker } from './joker.model';
export interface placeLetterJokerLetter {
  letter: string;
  index: number;
}
export interface placeLetterJokerArgs {
  wordle: string;
  maxUse?: number;
  useCount?: number;
  letters?: placeLetterJokerLetter[];
}
export class PlaceLetterJoker extends Joker {
  letters: placeLetterJokerLetter[];
  constructor(args?: placeLetterJokerArgs) {
    super(args);
    this.letters = args?.letters ?? this._setLetters(args?.wordle ?? '');
    console.warn(this.letters);
  }
  _setLetters(wordle: string): placeLetterJokerLetter[] {
    return this._shuffle(wordle.split(''));
  }
  _shuffle(array: string[]): placeLetterJokerLetter[] {
    let currentIndex = array.length,
      randomIndex;

    // Create a new array of objects with the letter and index properties
    const newArray = array.map((letter, index) => ({ letter, index }));

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [newArray[currentIndex], newArray[randomIndex]] = [
        newArray[randomIndex] ?? { letter: '', index: -1 },
        newArray[currentIndex] ?? { letter: '', index: -1 }
      ];
    }

    return newArray;
  }
  use(): placeLetterJokerLetter | null {
    console.warn(this.letters);
    if (this.soldOut) {
      return null;
    }
    return this.letters.shift() ?? null;
  }
  // use(wordle: string): placeLetterJokerLetter | null {
  //   if (!this.incrementUse()) {
  //     return null;
  //   }
  //   let letter;
  //   do {
  //     letter = this.getRandomLetterFrom(wordle);
  //   } while (this.letters.map((l) => l.letter).includes(letter.letter));
  //   this.letters.push(letter);
  //   return letter;
  // }
  // getRandomLetterFrom(text: string): placeLetterJokerLetter {
  //   const randInd = Math.floor(Math.random() * text.length);
  //   return { letter: text[randInd] ?? '', index: randInd };
  // }
}
