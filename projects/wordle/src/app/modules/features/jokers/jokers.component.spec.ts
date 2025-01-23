import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '@core/services/snackbar.service';
import { JokersComponent } from './jokers.component';

describe('JokersComponent', () => {
  let component: JokersComponent;
  let fixture: ComponentFixture<JokersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [JokersComponent],
    providers: [
        { provide: SnackbarService, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
    ]
}).compileComponents();

    fixture = TestBed.createComponent(JokersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Jokers component', () => {
    expect(component).toBeTruthy();
  });
});
