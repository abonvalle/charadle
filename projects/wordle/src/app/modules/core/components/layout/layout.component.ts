import { Component, OnInit } from '@angular/core';
import { GameService } from '@core/services/game.service';
import { PlatformService } from '@core/services/platform.service';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'layout',
  templateUrl: 'layout.component.html'
})
export class LayoutComponent implements OnInit {
  constructor(
    public platformService: PlatformService,
    public themeService: ThemeService,
    private _gameService: GameService
  ) {}
  ngOnInit(): void {
    this._gameService.initBoardGame();
  }
}
