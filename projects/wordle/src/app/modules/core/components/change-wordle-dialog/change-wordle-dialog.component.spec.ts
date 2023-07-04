import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogModule } from '@angular/material/dialog';
import { ChangeWordleDialogComponent } from './change-wordle-dialog.component';

describe('ChangeWordleDialogComponent', () => {
  let component: ChangeWordleDialogComponent;
  let fixture: ComponentFixture<ChangeWordleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeWordleDialogComponent],
      imports: [MatDialogModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeWordleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ChangeWordleDialog component', () => {
    expect(component).toBeTruthy();
  });
});
