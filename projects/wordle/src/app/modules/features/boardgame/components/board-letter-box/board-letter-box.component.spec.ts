import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardLetterBoxComponent } from './board-letter-box.component';

describe('BoardLetterBoxComponent', () => {
  let component: BoardLetterBoxComponent;
  let fixture: ComponentFixture<BoardLetterBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardLetterBoxComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BoardLetterBoxComponent);
    component = fixture.componentInstance;
    // component.boardBox = new BoardBox({ index: 1, boxSize: 2, letter: 'a' });
    fixture.detectChanges();
  });

  it('should create BoardLetterBox component', () => {
    expect(component).toBeTruthy();
  });
});
