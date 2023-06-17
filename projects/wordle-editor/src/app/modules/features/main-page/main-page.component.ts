import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '@core/services/game.service';
import { Subject } from 'rxjs';
import { SerieJoker } from '../../../models/joker';

@Component({
  selector: 'main-page',
  styles: [':host{overflow:hidden;height:100%}'],
  templateUrl: 'main-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit, OnDestroy {
  serieJoker$: Subject<SerieJoker> = new Subject();
  private _destroy$: Subject<void> = new Subject();
  constructor(public gameService: GameService, private _cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    // this.boardGame$ = this._gameService.boardGame$.asObservable().pipe(takeUntil(this._destroy$));
    // this._gameService.initGame();
  }

  ngOnDestroy(): void {
    this._destroy$?.next();
    this._destroy$?.unsubscribe();
  }
  onLetterClick(letter: string) {
    this.gameService.enterLetter(letter);
    this._cdr.detectChanges();
  }
}
