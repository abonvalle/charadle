export interface wordleArgs {
  date: string;
  text: string;
  serie: string;
  imgPath: string;
  fullname: string;
  difficulty?: number;
}
export class Wordle {
  date: string;
  text: string;
  serie: string;
  imgPath: string;
  fullname: string;
  difficulty: number;
  constructor(args: wordleArgs) {
    this.date = args.date;
    this.text = args.text;
    this.serie = args.serie;
    this.imgPath = args.imgPath;
    this.fullname = args.fullname;
    this.difficulty = args.difficulty ?? this._getDifficulty(args.text);
  }
  get length(): number {
    return this.text.length;
  }
  private _getDifficulty(wordle: string): number {
    if (wordle.length < 6) {
      return 1;
    } else if (wordle.length < 9) {
      return 2;
    } else {
      return 3;
    }
  }
}
