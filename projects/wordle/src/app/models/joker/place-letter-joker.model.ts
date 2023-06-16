import { Joker } from './joker.model';
export interface placeLetterJokerLetter {
  letter: string;
  index: number;
}
export interface placeLetterJokerArgs {
  name?: string;
  maxUse?: number;
  uses?: placeLetterJokerLetter[];
}
export class PlaceLetterJoker extends Joker {
  uses: placeLetterJokerLetter[];
  override get useCount(): number {
    return this.uses.length;
  }
  constructor(args?: placeLetterJokerArgs) {
    super(args);
    this.name = 'placeLetter';
    this.maxUse = args?.maxUse ?? 3;
    this.uses = args?.uses ?? [];
  }
  use(letter: placeLetterJokerLetter): boolean {
    if (this.soldOut) {
      return false;
    }
    this.uses.push(letter);
    return true;
  }
}
