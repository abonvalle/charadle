import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GameService } from '@core/services/game.service';
import { ShareService } from '@core/services/share.service';
import { Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'resultat-page',
    templateUrl: 'resultat-page.component.html',
    styles: [':host{overflow:hidden;height:100%}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, AsyncPipe]
})
export class ResultatPageComponent implements OnInit, OnDestroy {
  panelOpenState = true;
  tries: string[] = [];
  jokerData: string = '';
  timeLeftStr: string = '--h--';
  interval: any = null;
  get gameMsg(): string {
    return this.gameService.success$.value
      ? this.gameService.wordle$.value.text === 'gojo'
        ? 'Kyoshiki Murasaki'
        : 'Gagné !'
      : 'Si proche...';
  }
  sub: Subscription;
  constructor(
    public shareService: ShareService,
    public gameService: GameService,
    private _cdr: ChangeDetectorRef,
    private _router: Router
  ) {
    this.sub = this.gameService.end$.subscribe((end) => {
      if (end === false) {
        this._router.navigate(['/']);
      }
    });
  }
  ngOnInit(): void {
    this.tries = this.gameService.getTries() ?? [];
    this.jokerData = this.shareService.getSharingJokersData();
    this.startTimer();
  }
  ngOnDestroy(): void {
    this.pauseTimer();
    this.sub.unsubscribe();
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
}
