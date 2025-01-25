import { Clipboard } from '@angular/cdk/clipboard';
import { Injectable } from '@angular/core';
import { environment } from '@config/environment';
import { EnvironmentService } from './environment.service';
import { GameService } from './game.service';
import { JokersService } from './jokers.service';
import { SnackbarService } from './snackbar.service';

@Injectable({ providedIn: 'root' })
export class ShareService {
  constructor(
    private _gameService: GameService,
    private _jokersService: JokersService,
    private _snackbarService: SnackbarService,
    private _clipboard: Clipboard,
    private _envServ: EnvironmentService
  ) {}

  shareScore(): void {
    const shareData = this.generateShareData();
    // if (navigator.canShare && navigator.canShare(shareData)) {
    //   this._navShare(shareData);
    // } else {
    this._copyFallback(shareData.text ?? '');
    // }
  }
  generateShareData(): ShareData {
    const nbTries = this._gameService.success$.value ? this._gameService.currentActiveBoardLine$.value : '💀';
    const tries = this._gameService.getTries();
    const worldeDate = this._gameService.wordle$.value.date;
    const score = this.getScore();
    const text = [`Charadle ${this._envServ.version$.value.label} #${worldeDate} 🎯${score}pts ✍️${nbTries}/6`];
    tries?.forEach((aTry) => {
      text.push(aTry);
    });
    text.push(this.getSharingJokersData());
    text.push(environment.link);
    return {
      text: text.join('\n')
    };
  }
  getSharingJokersData(): string {
    const joker1Count = this._jokersService.paintJoker$.value?.useCount;
    const joker2Count = this._jokersService.placeLetterJoker$.value?.useCount;
    const joker3Count = this._jokersService.serieJoker$.value?.useCount;
    const hasUsedJoker = joker1Count !== 0 || joker2Count !== 0 || joker3Count !== 0;
    if (hasUsedJoker) {
      return `🖌️x${joker1Count}, 🔤x${joker2Count}, 🎥x${joker3Count}`;
    } else {
      return `0x🃏`;
    }
  }
  getScore(): number {
    const difficulty = this._gameService.wordle$.value.difficulty ?? 1;
    const nbTries = this._gameService.currentActiveBoardLine$.value ?? 0;
    const paintJoker = this._jokersService.paintJoker$.value;
    const placeLetterJoker = this._jokersService.placeLetterJoker$.value;
    const serieJoker = this._jokersService.serieJoker$.value;
    if (
      (this._gameService.end$.value && !this._gameService.success$.value) ||
      !paintJoker ||
      !placeLetterJoker ||
      !serieJoker
    ) {
      return 0;
    }
    const joker1Count = paintJoker.useCount;
    const joker2Count = placeLetterJoker.useCount;
    const joker1CountMax = paintJoker.maxUse;
    const joker2CountMax = placeLetterJoker.maxUse;
    const joker3Count = serieJoker.useCount;
    let score = 100;

    //Origin joker = -10,9 or 8pts
    score -= joker3Count > 0 ? 10 - (difficulty - 1) : 0;

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
