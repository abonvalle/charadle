import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '@core/services/game.service';
import { ThemeService } from '@core/services/theme.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'layout',
  templateUrl: 'layout.component.html'
})
export class LayoutComponent implements OnInit, OnDestroy {
  _destroy$: Subject<void> = new Subject();
  themeId$ = this._themeService.activeThemeId$.pipe(takeUntil(this._destroy$));

  constructor(private _gameService: GameService, private _themeService: ThemeService) {}
  ngOnInit(): void {
    this._gameService.initBoardGame();
  }
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }
}
