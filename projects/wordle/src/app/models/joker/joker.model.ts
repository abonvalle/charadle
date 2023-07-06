export interface jokerArgs {
  name?: string;
  useCount?: number;
  difficulty?: number;
}
export class Joker {
  name: string;
  maxUse: number;
  points: number;
  get useCount(): number {
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
    this.maxUse = this._getMaxUses(args?.difficulty ?? 1);
    this.points = 0;
  }
  _getMaxUses(difficulty: number): number {
    switch (difficulty) {
      case 2:
        return 4;
      case 3:
        return 5;
      case 1:
      default:
        return 3;
    }
  }
}
