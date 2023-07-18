import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '@core/services/game.service';
import { ShareService } from '@core/services/share.service';

@Component({
  selector: 'resultat-page',
  templateUrl: 'resultat-page.component.html',
  styles: [':host{overflow:hidden;height:100%}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultatPageComponent implements OnInit, OnDestroy {
  panelOpenState = true;
  tries: string[] = [];
  jokerData: string = '';
  timeLeftStr: string = '--h--';
  interval: any = null;
  get gameMsg(): string {
    return this.gameService.boardGame$.value?.success
      ? this.gameService.boardGame$.value?.wordle.text === 'gojo'
        ? 'Kyoshiki Murasaki'
        : 'Gagné !'
      : 'Si proche...';
  }
  constructor(public shareService: ShareService, public gameService: GameService, private _cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.tries = this.gameService.boardGame$.value?.getTries() ?? [];
    this.jokerData = this.shareService.getSharingJokersData();
    this.startTimer();
  }
  ngOnDestroy(): void {
    this.pauseTimer();
  }
  openPanel(): void {
    this.panelOpenState = true;
    this.startTimer();
    this._cdr.detectChanges();
  }
  closePanel(): void {
    this.panelOpenState = false;
    this.pauseTimer();
    this._cdr.detectChanges();
  }

  startTimer() {
    this.timeLeftStr = this.calculateTimeLeft();
    this._cdr.detectChanges();

    // Mettre à jour le minuteur toutes les minutes
    this.interval = setInterval(() => {
      this.timeLeftStr = this.calculateTimeLeft();
      this._cdr.detectChanges();
    }, 1000); // 60000 ms = 1 minute
    this.interval;
  }
  calculateTimeLeft(): string {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    let timeLeft = midnight.getTime() - now.getTime();
    // Calculer les heures et minutes restantes
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return timeLeft > 0
      ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}`
      : '00:00:00';
  }

  pauseTimer() {
    this.interval && clearInterval(this.interval);
  }
  trackByFn(index: number, _item: string) {
    return index;
  }
}
