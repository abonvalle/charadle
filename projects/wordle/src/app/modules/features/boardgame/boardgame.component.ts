import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { APIService } from '@core/services/api.service';
import { GameService } from '@core/services/game.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'boardgame',
    templateUrl: 'boardgame.component.html',
    styles: [':host{flex-grow:1;overflow:auto}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class BoardgameComponent implements OnInit, OnDestroy {
  _destroy$: Subject<void> = new Subject();
  constructor(
    public gameService: GameService,
    private _cdr: ChangeDetectorRef,
    private _apiServ: APIService
  ) {}
  ngOnInit(): void {
    this.gameService.wordle$
      .asObservable()
      .pipe(takeUntil(this._destroy$))
      .subscribe((w) => {
        this._apiServ.setWordle(w);
      });
    this.gameService.boardLines$
      .asObservable()
      .pipe(takeUntil(this._destroy$))
      .subscribe((boardLines) => {
        this._apiServ.setBoardLines(boardLines);
        console.warn(boardLines);
        // this._cdr.detectChanges();
      });

    this.gameService.end$
      .asObservable()
      .pipe(takeUntil(this._destroy$))
      .subscribe((end) => {
        this._apiServ.setEnd(end);
        this._cdr.detectChanges();
      });
    this.gameService.success$
      .asObservable()
      .pipe(takeUntil(this._destroy$))
      .subscribe((success) => {
        this._apiServ.setSuccess(success);
        this._cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this._destroy$?.next();
    this._destroy$?.unsubscribe();
  }

  isCursor(
    line: { guess: string; submitted: boolean; current: boolean; lineIndex: number },
    indexLetter: number
  ): boolean {
    return line.current && line.guess.length === indexLetter;
  }
}
