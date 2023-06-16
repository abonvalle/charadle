import { Joker } from './joker.model';
export interface paintJokerArgs {
  name?: string;
  maxUse?: number;
  uses?: string[];
  difficulty?: number;
}
export class PaintJoker extends Joker {
  uses: string[];
  override get useCount(): number {
    return this.uses.length;
  }
  constructor(args?: paintJokerArgs) {
    super(args);
    this.name = 'paintLetter';
    this.uses = args?.uses ?? [];
  }
  use(letter: string): boolean {
    if (this.soldOut) {
      return false;
    }
    this.uses.push(letter);
    return true;
  }
}
