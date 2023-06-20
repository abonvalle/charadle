import { Component, OnInit } from '@angular/core';
import { GameService } from '@editor-core/services/game.service';
import { ThemeService } from '@editor-core/services/theme.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'layout',
  templateUrl: 'layout.component.html'
})
export class LayoutComponent implements OnInit {
  _destroy$: Subject<void> = new Subject();
  themeId = this._themeService.defaultTheme;

  constructor(private _gameService: GameService, private _themeService: ThemeService) {}
  ngOnInit(): void {
    this._gameService.initBoardGame();
  }
}
