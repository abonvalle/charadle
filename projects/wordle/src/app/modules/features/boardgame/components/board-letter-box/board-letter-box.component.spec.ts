import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokersService } from '@core/services/jokers.service';
import { PlaceLetterJoker } from '@models';
import { BehaviorSubject } from 'rxjs';
import { BoardLetterBoxComponent } from './board-letter-box.component';

describe('BoardLetterBoxComponent', () => {
  let component: BoardLetterBoxComponent;
  let fixture: ComponentFixture<BoardLetterBoxComponent>;
  const serviceSpy = jasmine.createSpyObj(
    'JokersService',
    {},
    {
      placeLetterJoker$: new BehaviorSubject<PlaceLetterJoker | null>(null)
    }
  );
  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BoardLetterBoxComponent],
    providers: [{ provide: JokersService, useValue: serviceSpy }]
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
