import { Clipboard } from '@angular/cdk/clipboard';
import { Injectable } from '@angular/core';
import { GameService } from './game.service';
import { SnackbarService } from './snackbar.service';

@Injectable({ providedIn: 'root' })
export class ShareService {
  constructor(
    private _gameService: GameService,
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
    const text = [`Wordle Series edition #${worldeDate} ✍️${nbTries}/6`];
    tries?.forEach((aTry) => {
      text.push(aTry);
    });
    text.push(this.getSharingJokersData());
    text.push('https://wordle-series.abvdev.fr');
    return {
      text: text.join('\n')
    };
  }
  getSharingJokersData(): string {
    const bg = this._gameService.boardGame$.value;
    const joker1Count = bg?.jokers.paintJoker.useCount;
    const joker2Count = bg?.jokers.placeLetterJoker.useCount;
    const joker3Count = bg?.jokers.serieJoker.useCount;
    const hasUsedJoker = joker1Count !== 0 || joker2Count !== 0 || joker3Count !== 0;
    if (hasUsedJoker) {
      return `🖌️x${joker1Count}, 🔤x${joker2Count}, 🎥x${joker3Count}`;
    } else {
      return `0x🃏`;
    }
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
