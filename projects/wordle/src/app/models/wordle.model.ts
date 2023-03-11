export interface wordleArgs {
  date: string;
  text: string;
  serie: string;
}
export class Wordle {
  date: string;
  text: string;
  serie: string;
  difficulty: 'easy' | 'hard';
  constructor(args: wordleArgs) {
    this.date = args.date;
    this.text = args.text;
    this.serie = args.serie;
    this.difficulty = this._setDifficulty(args.text);
  }
  get length(): number {
    return this.text.length;
  }
  private _setDifficulty(text: string): 'easy' | 'hard' {
    const pointsLettres = {
      a: 1,
      b: 3,
      c: 3,
      d: 2,
      e: 1,
      f: 4,
      g: 2,
      h: 4,
      i: 1,
      j: 8,
      k: 5,
      l: 1,
      m: 3,
      n: 1,
      o: 1,
      p: 3,
      q: 10,
      r: 1,
      s: 1,
      t: 1,
      u: 1,
      v: 4,
      w: 4,
      x: 8,
      y: 4,
      z: 10
    };

    let sommePoints = 0;
    for (let i = 0; i < text.length; i++) {
      const lettre = text[i]?.toLowerCase();
      if (!lettre) {
        continue;
      }
      if (pointsLettres.hasOwnProperty(lettre)) {
        sommePoints += pointsLettres[lettre as keyof typeof pointsLettres] ?? 0;
      }
    }

    const moyennePoints = sommePoints / text.length;
    return moyennePoints > 4 ? 'hard' : 'easy';
  }
}
