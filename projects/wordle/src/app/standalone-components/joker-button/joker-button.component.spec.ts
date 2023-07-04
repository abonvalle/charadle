import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Joker } from '../../models/joker';
import { JokerButtonComponent } from './joker-button.component';

describe('JokerButtonComponent', () => {
  let component: JokerButtonComponent;
  let fixture: ComponentFixture<JokerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JokerButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(JokerButtonComponent);
    component = fixture.componentInstance;
    component.joker = new Joker();
    fixture.detectChanges();
  });

  it('should create JokerButton component', () => {
    expect(component).toBeTruthy();
  });
});
