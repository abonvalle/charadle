import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { APIService } from '@core/services/api.service';
import { GameService } from '@core/services/game.service';
import { Subject, takeUntil } from 'rxjs';
import { BoardBox, BoardGame, BoardLine } from '../../../models/boardgame';

@Component({
  selector: 'boardgame-v2',
  templateUrl: 'boardgame-v2.component.html',
  styles: [':host{flex-grow:1;overflow:auto}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardgameV2Component implements OnInit, OnDestroy {
  boardLines$: Subject<BoardLine[]> = new Subject();
  _destroy$: Subject<void> = new Subject();
  constructor(private _gameService: GameService, private _cdr: ChangeDetectorRef, private _apiServ: APIService) {}
  ngOnInit(): void {
    const boardGame = this._gameService.boardGame$?.value;
    const boardLines = Array.from(boardGame?.boardLines.values() ?? []);
    this.boardLines$.next(boardLines);
    this._cdr.detectChanges();
    this._gameService.boardGame$
      .asObservable()
      .pipe(takeUntil(this._destroy$))
      .subscribe((boardGame) => {
        const boardLines = Array.from(boardGame?.boardLines.values() ?? []);
        boardLines.forEach((bl) => {
          bl.boardBoxes.forEach((bb) => (bb = this._setBGClass(boardGame, bl, bb)));
        });
        this.boardLines$.next(boardLines);
        boardGame && this._apiServ.setBoardgame(boardGame);
        this._cdr.detectChanges();
      });
  }
  private _setBGClass(boardGame: BoardGame | null, boardLine: BoardLine, boardBox: BoardBox): BoardBox {
    const classes = [];
    // classes.push(
    //   boardBox.isActive
    //     ? this._themeService.newtheme$.value.activeBoardBox
    //     : this._themeService.newtheme$.value.boardBox
    // );
    if (!boardGame?.end) {
      boardBox.isActive && classes.push('active after:animate-pulse-fast after:absolute');
      boardLine.isActive &&
        boardBox.letter === '' &&
        boardBox.before &&
        classes.push(`before:content-['${boardBox.before}'] before:opacity-50 before:relative`);
    }
    if (boardBox.background !== 'none') {
      classes.push(
        `animate-[flip-${boardBox.background}_1.5s_ease-in-out_${Math.floor(boardBox.index * 0.3 * 10) / 10}s_forwards]`
      );
    } else {
      // classes.push(this._themeService.theme$.value.boardLetterBg);
    }

    //colorblind
    classes.push(`accessibility-${boardBox.background}`);
    boardBox.classes = classes;
    return boardBox;
  }
  ngOnDestroy(): void {
    this._destroy$?.next();
    this._destroy$?.unsubscribe();
  }
  trackByFn(_index: number, item: BoardLine) {
    return item.index;
  }
  isCursor(
    line: { guess: string; submitted: boolean; current: boolean; lineIndex: number },
    indexLetter: number
  ): boolean {
    return line.current && line.guess.length === indexLetter;
  }
}
