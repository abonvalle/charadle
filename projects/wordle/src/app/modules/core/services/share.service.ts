import { Clipboard } from '@angular/cdk/clipboard';
import { Injectable } from '@angular/core';
import { environment } from '@config/environment';
import { GameService } from './game.service';
import { JokersService } from './jokers.service';
import { SnackbarService } from './snackbar.service';

@Injectable({ providedIn: 'root' })
export class ShareService {
  constructor(
    private _gameService: GameService,
    private _jokersService: JokersService,
    private _snackbarService: SnackbarService,
    private _clipboard: Clipboard
  ) {}
  /**Wordle Séries edition #23 */
  /** 🟧⬛⬛🟧⬛⬛ */
  /** 🟧⬛⬛⬛⬛🟩 */
  /** 🟧⬛⬛🟩🟩🟩 */
  /**🎯x20 - ✍️x5 | 🚫🃏 => 🖌️x3, 🔤x3, 🎥x1 */
  /**https://wordle-series.abvdev.fr */
  shareScore(): void {
    const shareData = this.generateShareData();
    // if (navigator.canShare && navigator.canShare(shareData)) {
    //   this._navShare(shareData);
    // } else {
    this._copyFallback(shareData.text ?? '');
    // }
  }
  generateShareData(): ShareData {
    const bg = this._gameService.boardGame$.value;
    const nbTries = bg?.success ? bg?.currentActiveBoardLine : '💀';
    const tries = bg?.getTries();
    const worldeDate = bg?.wordle.date;
    const score = this.getScore();
    const text = [`Wordle ${environment.version.label} #${worldeDate} 🎯${score}pts ✍️${nbTries}/6`];
    tries?.forEach((aTry) => {
      text.push(aTry);
    });
    text.push(this.getSharingJokersData());
    text.push(environment.version.link);
    return {
      text: text.join('\n')
    };
  }
  getSharingJokersData(): string {
    const joks = this._jokersService.jokers$.value;
    const joker1Count = joks?.paintJoker.useCount;
    const joker2Count = joks?.placeLetterJoker.useCount;
    const joker3Count = joks?.serieJoker.useCount;
    const hasUsedJoker = joker1Count !== 0 || joker2Count !== 0 || joker3Count !== 0;
    if (hasUsedJoker) {
      return `🖌️x${joker1Count}, 🔤x${joker2Count}, 🎥x${joker3Count}`;
    } else {
      return `0x🃏`;
    }
  }
  getScore(): number {
    const bg = this._gameService.boardGame$.value;
    const difficulty = this._gameService.boardGame$.value?.wordle.difficulty ?? 1;
    const nbTries = bg?.success ? bg?.currentActiveBoardLine : 0;
    const joks = this._jokersService.jokers$.value;
    if (!bg?.success || !joks) {
      return 0;
    }
    const joker1Count = joks?.paintJoker.useCount;
    const joker2Count = joks?.placeLetterJoker.useCount;
    const joker1CountMax = joks?.paintJoker.maxUse;
    const joker2CountMax = joks?.placeLetterJoker.maxUse;
    const joker3Count = joks?.serieJoker.useCount;
    let score = 100;

    //Origin joker = -10,9 or 8pts
    score -= joker3Count > 0 ? 10 - (difficulty - 1) ?? 10 : 0;

    //Paint joker = -19pts / maxUse * useCount
    score -= (19 / joker1CountMax) * joker1Count;

    //Place joker = -36pts / maxUse * useCount
    score -= (36 / joker2CountMax) * joker2Count;

    //Tries/difficulty
    score -= (2 - 0.25 * (difficulty - 1)) * Math.pow(nbTries - 0.5, 2);

    return Math.round(score > 100 ? 100 : score);
  }
  _navShare(shareData: ShareData): void {
    if (!navigator.share) {
      this._copyFallback(shareData.text ?? '');
      return;
    }
    navigator
      .share(shareData)
      .then(() => console.log('Successful share!'))
      .catch((err) => {
        console.error(err);
        this._copyFallback(shareData.text ?? '');
      });
  }
  private _copyFallback(text: string): void {
    text.trim() !== '' && this._copyLongText(text)
      ? this._snackbarService.openSnackBar('Copié 👌', 'success')
      : this._snackbarService.openSnackBar('Impossible de copier le résultat 🤷', 'alert');
  }
  private _copyLongText(text: string): boolean {
    const pending = this._clipboard.beginCopy(text);
    let remainingAttempts = 3;
    let result;
    do {
      result = pending.copy();
    } while (!result || --remainingAttempts);
    pending.destroy();
    return !!result;
  }
}
