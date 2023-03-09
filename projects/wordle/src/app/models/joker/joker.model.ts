export interface jokerArgs {
  maxUse?: number;
  useCount?: number;
}
export class Joker {
  maxUse: number;
  useCount: number;
  constructor(args?: jokerArgs) {
    this.maxUse = args?.maxUse ?? 3;
    this.useCount = args?.useCount ?? 0;
  }
  incrementUse(): boolean {
    if (this.useCount < this.maxUse) {
      this.useCount++;
      return true;
    }
    return false;
  }
  get progress(): number {
    const rawProgress = (this.useCount ?? 0) / (this.maxUse ?? 1);
    return Math.floor(rawProgress * 10) * 10;
  }
  get soldOut(): boolean {
    return this.progress === 100;
  }
}
