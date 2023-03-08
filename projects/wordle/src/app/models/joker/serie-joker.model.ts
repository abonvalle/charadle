import { Joker } from './joker.model';
export interface serieJokerArgs {
  useCount?: number;
  serieName?: string;
}
export class SerieJoker extends Joker {
  serieName: string;
  constructor(args?: serieJokerArgs) {
    super({ ...args, maxUse: 1 });
    this.serieName = args?.serieName ?? '';
  }
  use(): void {}
}
