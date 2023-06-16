import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { APIService } from '@core/services/api.service';
import { GameService } from '@core/services/game.service';
import { Subject, takeUntil } from 'rxjs';
import { BoardBox, BoardGame, BoardLine } from '../../../models/boardgame';

@Component({
  selector: 'boardgame',
  templateUrl: 'boardgame.component.html',
  styles: [':host{flex-grow:1;overflow:auto}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardgameComponent implements OnInit, OnDestroy {
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
  test() {
    // const words = [
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'philip',
    //   'otis',
    //   'viserys',
    //   'janine',
    //   'karen',
    //   'dwight',
    //   'creed',
    //   'malcolm',
    //   'felipe',
    //   'kevin',
    //   'ross',
    //   'fred',
    //   'XXX',
    //   'XXX',
    //   'lizzie',
    //   'peach',
    //   'stannis',
    //   'ivar',
    //   'dale',
    //   'leslie',
    //   'gregg',
    //   'andrea',
    //   'javier',
    //   'benjamin',
    //   'jeremiah',
    //   'DEC2',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'brian',
    //   'rajesh',
    //   'clementine',
    //   'dylan',
    //   'shayla',
    //   'ramsay',
    //   'daenerys',
    //   'rosa',
    //   'phillip',
    //   'edward',
    //   'gendry',
    //   'DEC3',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'silene',
    //   'alex',
    //   'robb',
    //   'esme',
    //   'sang-woo',
    //   'phyllis',
    //   'angela',
    //   'marienne',
    //   'irene',
    //   'emma',
    //   'andres',
    //   'DEC4',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'norman',
    //   'jose',
    //   'horacio',
    //   'melisandre',
    //   'jim',
    //   'will',
    //   'lagertha',
    //   'carla',
    //   'tata',
    //   'nadia',
    //   'rachel',
    //   'DEC5',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'guinevere',
    //   'hank',
    //   'michael',
    //   'carlota',
    //   'vince',
    //   'oscar',
    //   'sophia',
    //   'geralt',
    //   'rita',
    //   'floki',
    //   'michonne',
    //   'DEC6',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'nicky',
    //   'ashley',
    //   'theodore',
    //   'lori',
    //   'ron',
    //   'jan',
    //   'saul',
    //   'marshall',
    //   'mary',
    //   'todd',
    //   'deok-su',
    //   'DEC7',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'sunil',
    //   'jackson',
    //   'pam',
    //   'anibal',
    //   'tom',
    //   'ragnar',
    //   'luke',
    //   'jean-jacques',
    //   'henry',
    //   'june',
    //   'maria',
    //   'DEC8',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'linda',
    //   'lucerys',
    //   'samwell',
    //   'harry',
    //   'nick',
    //   'blanca',
    //   'valeria',
    //   'lily',
    //   'tuco',
    //   'angelo',
    //   'marie',
    //   'DEC9',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'claudette',
    //   'judith',
    //   'sylvain',
    //   'margaery',
    //   'aegon',
    //   'lucas',
    //   'joyce',
    //   'ryan',
    //   'raymond',
    //   'catelyn',
    //   'vaemond',
    //   'DEC10',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'bernard',
    //   'hope',
    //   'jaskier',
    //   'allston',
    //   'sarah',
    //   'prune',
    //   'roy',
    //   'yennefer',
    //   'debbie',
    //   'cary',
    //   'kelly',
    //   'DEC11',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'tiffany',
    //   'larry',
    //   'negan',
    //   'robert',
    //   'cindy',
    //   'tissaia',
    //   'vivien',
    //   'charlotte',
    //   'arya',
    //   'james',
    //   'sigurd',
    //   'DEC12',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'henri',
    //   'sansa',
    //   'leonard',
    //   'chandler',
    //   'cleo',
    //   'jaime',
    //   'erica',
    //   'agata',
    //   'darryl',
    //   'joey',
    //   'amy',
    //   'DEC13',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'dustin',
    //   'billy',
    //   'galina',
    //   'bradley',
    //   'nancy',
    //   'marie-jeanne',
    //   'franklin',
    //   'leon',
    //   'mark',
    //   'alicent',
    //   'jakob',
    //   'DEC14',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'debra',
    //   'hal',
    //   'fringilla',
    //   'gi-hun',
    //   'samuel',
    //   'glenn',
    //   'stuart',
    //   'pablo',
    //   'monica',
    //   'erik',
    //   'reese',
    //   'DEC15',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'jacqui',
    //   'rhaenys',
    //   'varys',
    //   'Drogo',
    //   'alma',
    //   'chuck',
    //   'francesca',
    //   'lidia',
    //   'steve',
    //   'benny',
    //   'ezekiel',
    //   'DEC16',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'junior',
    //   'aemond',
    //   'siggy',
    //   'raquel',
    //   'penny',
    //   'joffrey',
    //   'sergio',
    //   'merle',
    //   'ola',
    //   'fabio',
    //   'carol',
    //   'DEC17',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'terry',
    //   'tywin',
    //   'love',
    //   'lucrecia',
    //   'moira',
    //   'martin',
    //   'maggie',
    //   'arthur',
    //   'brienne',
    //   'violet',
    //   'barney',
    //   'DEC18',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'tormund',
    //   'mi-nyeo',
    //   'ted',
    //   'tasha',
    //   'christian',
    //   'bob',
    //   'ada',
    //   'olivia',
    //   'daemon',
    //   'eduardo',
    //   'dexter',
    //   'DEC19',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'constance',
    //   'stevie',
    //   'francisco',
    //   'finn',
    //   'aimee',
    //   'mike',
    //   'ruby',
    //   'maeve',
    //   'dmitri',
    //   'ann',
    //   'Kimberly',
    //   'DEC20',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'il-nam',
    //   'mycroft',
    //   'janet',
    //   'sofia',
    //   'anwar',
    //   'david',
    //   'sam',
    //   'murray',
    //   'skyler',
    //   'carlos',
    //   'jason',
    //   'DEC21',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'thomas',
    //   'emily',
    //   'serena',
    //   'jonathan',
    //   'leopoldo',
    //   'stanley',
    //   'helen',
    //   'rosita',
    //   'judy',
    //   'wendy',
    //   'daisy',
    //   'DEC22',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'triss',
    //   'delilah',
    //   'kalf',
    //   'curly',
    //   'irving',
    //   'norma',
    //   'alice',
    //   'sally',
    //   'eddard',
    //   'gustavo',
    //   'rhaenyra',
    //   'DEC23',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'john',
    //   'mirko',
    //   'maxine',
    //   'sheldon',
    //   'dominique',
    //   'juan',
    //   'william',
    //   'adam',
    //   'logan',
    //   'cersei',
    //   'erin',
    //   'DEC24',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'kay',
    //   'phoebe',
    //   'shane',
    //   'suzanne',
    //   'andrew',
    //   'krista',
    //   'francis',
    //   'guillaume',
    //   'gina',
    //   'eric',
    //   'elisa',
    //   'DEC25',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'gloria',
    //   'marc',
    //   'tyrell',
    //   'aaron',
    //   'hershel',
    //   'jakov',
    //   'ben',
    //   'joe',
    //   'eugene',
    //   'theon',
    //   'holly',
    //   'DEC26',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'cesar',
    //   'joanna',
    //   'craig',
    //   'johnny',
    //   'carl',
    //   'gideon',
    //   'piper',
    //   'jesse',
    //   'alicia',
    //   'rick',
    //   'elliot',
    //   'DEC27',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'connie',
    //   'laenor',
    //   'alison',
    //   'kady',
    //   'agustin',
    //   'rollo',
    //   'fernando',
    //   'hector',
    //   'zhang',
    //   'jon',
    //   'daryl',
    //   'DEC28',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'sae-byeok',
    //   'XXX',
    //   'walter',
    //   'jamie',
    //   'candace',
    //   'caleb',
    //   'sara',
    //   'jolene',
    //   'grace',
    //   'andy',
    //   'ciri',
    //   'DEC29',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'eleanor',
    //   'XXX',
    //   'chidi',
    //   'vasily',
    //   'jorah',
    //   'shama',
    //   'charlie',
    //   'holden',
    //   'petyr',
    //   'santiago',
    //   'jane',
    //   'DEC30',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'ubbe',
    //   'XXX',
    //   'chris',
    //   'XXX',
    //   'howard',
    //   'XXX',
    //   'dolores',
    //   'robin',
    //   'XXX',
    //   'arturo',
    //   'XXX',
    //   'DEC31'
    // ];
    // let date = new Date('01/01/2023');
    // const nw = [];
    // let numerodujour = date.getDate();
    // let numerodumois = date.getMonth() + 1;
    // let numeroannee = date.getFullYear() - 2022;
    // let index = 1;
    // do {
    //   const ind =
    //     12 * (numerodujour - 1) + numerodumois + (Math.pow(numerodujour, 2) + 1 * numerodujour) / 2 + 868 * numeroannee;
    //   nw.push(words[ind - 1]);
    //   console.warn(ind);
    //   date.setDate(date.getDate() + 1);
    //   console.warn(date);
    //   numerodujour = date.getDate();
    //   numerodumois = date.getMonth() + 1;
    //   index++;
    // } while (index <= 365);
    // console.warn(nw);
  }
}
