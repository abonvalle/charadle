import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '@core/services/game.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { BoardGame } from '../../../models/board-game';

@Component({
  selector: 'main-page',
  styles: [':host{overflow:hidden;height:100%}'],
  templateUrl: 'main-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit, OnDestroy {
  _destroy$: Subject<void> = new Subject();
  boardGame$: Observable<BoardGame | null> = new Observable();
  constructor(private _gameService: GameService, private _cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.boardGame$ = this._gameService.boardGame$.asObservable().pipe(takeUntil(this._destroy$));
    this._gameService.initGame();
  }

  ngOnDestroy(): void {
    this._destroy$?.next();
    this._destroy$?.unsubscribe();
  }
  onLetterClick(letter: string) {
    this._gameService.enterLetter(letter);
    this._cdr.detectChanges();
  }
}
