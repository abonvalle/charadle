import { ChangeDetectorRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GameService } from '@core/services/game.service';
import { BoardgameComponent } from './boardgame.component';
class MockGameService {}
class MockChangeDetectorRef {}
describe('BoardgameComponent', () => {
  let comp: BoardgameComponent;
  // let fixture: ComponentFixture<BoardgameComponent>;
  let gameServ: GameService;
  let cdrServ: ChangeDetectorRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        BoardgameComponent,
        { provide: GameService, useClass: MockGameService },
        { provide: ChangeDetectorRef, useClass: MockChangeDetectorRef }
      ]
    }).compileComponents();

    comp = TestBed.inject(BoardgameComponent);
    gameServ = TestBed.inject(GameService);
    cdrServ = TestBed.inject(ChangeDetectorRef);
  });

  it('should create Boardgame component', () => {
    expect(comp).toBeTruthy();
  });
  it('should inject GameService', () => {
    expect(gameServ).toBeTruthy();
  });
  it('should inject ChangeDetectorRef', () => {
    expect(cdrServ).toBeTruthy();
  });
});
