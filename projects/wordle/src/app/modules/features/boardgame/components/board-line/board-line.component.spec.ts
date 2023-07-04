import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardLineComponent } from './board-line.component';

describe('BoardLineComponent', () => {
  let component: BoardLineComponent;
  let fixture: ComponentFixture<BoardLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardLineComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BoardLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create BoardLine component', () => {
    expect(component).toBeTruthy();
  });
});
