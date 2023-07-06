import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '@core/services/game.service';
import { JokersService } from '@core/services/jokers.service';
import { KeyboardService } from '@core/services/keyboard.service';
import { SettingsService } from '@core/services/settings.service';
import { ShareService } from '@core/services/share.service';
import { Subject, filter, map, takeUntil } from 'rxjs';
import { SerieJoker } from '../../../models/joker';

@Component({
  selector: 'main-page',
  styles: [':host{overflow:hidden;height:100%}'],
  templateUrl: 'main-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit, OnDestroy {
  serieJoker$: Subject<SerieJoker> = new Subject();
  points$: Subject<number> = new Subject();
  private _destroy$: Subject<void> = new Subject();
  constructor(
    public shareService: ShareService,
    public gameService: GameService,
    public settingsService: SettingsService,
    private _jokersService: JokersService,
    private _cdr: ChangeDetectorRef,
    private _keyboardServ: KeyboardService
  ) {}
  ngOnInit(): void {
    // this.boardGame$ = this._gameService.boardGame$.asObservable().pipe(takeUntil(this._destroy$));
    // this._gameService.initGame();
    this.serieJoker$ = this._jokersService.jokers$.pipe(
      takeUntil(this._destroy$),
      filter((jks) => jks !== null && !!jks?.serieJoker),
      map((jks) => jks?.serieJoker)
    ) as Subject<SerieJoker>;

    this.gameService.boardGame$.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this.points$.next(this.shareService.getScore());
      this._cdr.detectChanges();
    });

    this.points$.next(this.shareService.getScore());
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

  @HostListener('window:keydown', ['$event'])
  onkeydown(event: KeyboardEvent) {
    event.stopPropagation();
    event.preventDefault();
    let key = event.key === 'Backspace' ? 'delete' : event.key === 'Enter' ? 'enter' : event.key;
    if (this._keyboardServ.getKey(key.toLowerCase())) {
      this.onLetterClick(key.toLowerCase());
    }
  }
}
