import { Joker } from './joker.model';
export interface serieJokerArgs {
  name?: string;
  uses?: number;
}
export class SerieJoker extends Joker {
  uses: number;
  override get useCount(): number {
    return this.uses;
  }
  constructor(args?: serieJokerArgs) {
    super({ ...args });
    this.name = 'serie';
    this.uses = args?.uses ?? 0;
    this.maxUse = 1;
  }
  use(): boolean {
    if (this.soldOut) {
      return false;
    }
    this.uses++;
    return true;
  }
}
