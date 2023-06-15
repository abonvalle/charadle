import { Joker } from './joker.model';
export interface serieJokerArgs {
  name?: string;
  useCount?: number;
  serieName?: string;
}
export class SerieJoker extends Joker {
  serieName: string;
  constructor(args?: serieJokerArgs) {
    super({ ...args, maxUse: 1 });
    this.name = 'serie';
    this.serieName = args?.serieName ?? '';
  }
  use(): string | null {
    if (this.soldOut) {
      return null;
    }
    return this.serieName;
  }
}
