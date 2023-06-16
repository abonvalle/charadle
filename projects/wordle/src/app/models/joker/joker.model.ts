export interface jokerArgs {
  name?: string;
  maxUse?: number;
  useCount?: number;
}
export class Joker {
  name: string;
  maxUse: number;
  protected get useCount(): number {
    return 0;
  }
  get progress(): number {
    const rawProgress = (this.useCount ?? 0) / (this.maxUse ?? 1);
    return Math.floor(rawProgress * 10) * 10;
  }
  get soldOut(): boolean {
    return this.useCount >= this.maxUse;
  }
  constructor(args?: jokerArgs) {
    this.name = args?.name ?? '';
    this.maxUse = args?.maxUse ?? 3;
  }
}
