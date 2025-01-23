import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { EnvironmentService } from '@core/services/environment.service';
import { GameService } from '@core/services/game.service';
import { JokersService } from '@core/services/jokers.service';
import { SettingsService } from '@core/services/settings.service';
import { ShareService } from '@core/services/share.service';
import { Subject, combineLatestWith, filter, takeUntil } from 'rxjs';
import { SerieJoker } from '../../../models/joker';

@Component({
    selector: 'main-page',
    styles: [':host{overflow:hidden;height:100%}'],
    templateUrl: 'main-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class MainPageComponent implements OnInit, OnDestroy {
  serieJoker$: Subject<SerieJoker> = new Subject();
  points$: Subject<number> = new Subject();
  private _destroy$: Subject<void> = new Subject();
  constructor(
    public gameService: GameService,
    public envServ: EnvironmentService,
    public settingsService: SettingsService,
    private _shareService: ShareService,
    private _jokersService: JokersService,
    private _cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.serieJoker$ = this._jokersService.serieJoker$.pipe(
      takeUntil(this._destroy$),
      filter((jks) => jks !== null)
    ) as Subject<SerieJoker>;

    this.gameService.currentActiveBoardLine$
      .pipe(
        combineLatestWith(this._jokersService.paintJoker$),
        combineLatestWith(this._jokersService.placeLetterJoker$),
        combineLatestWith(this._jokersService.serieJoker$),
        takeUntil(this._destroy$)
      )
      .subscribe(() => {
        this.points$.next(this._shareService.getScore());
        this._cdr.detectChanges();
      });

    this.points$.next(this._shareService.getScore());
    this._cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this._destroy$?.next();
    this._destroy$?.unsubscribe();
  }
  onLetterClick(letter: string) {
    this.gameService.enterLetter(letter);
    this._cdr.detectChanges();
  }

  // @HostListener('window:keydown', ['$event'])
  // onkeydown(event: KeyboardEvent) {
  //   event.stopPropagation();
  //   event.preventDefault();
  //   let key = event.key === 'Backspace' ? 'delete' : event.key === 'Enter' ? 'enter' : event.key;
  //   if (this._keyboardServ.getKey(key.toLowerCase())) {
  //     this.onLetterClick(key.toLowerCase());
  //   }
  // }
}
