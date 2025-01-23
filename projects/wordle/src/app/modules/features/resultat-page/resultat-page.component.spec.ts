import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '@core/services/snackbar.service';
import { ResultatPageComponent } from './resultat-page.component';

describe('ResultatPageComponent', () => {
  let component: ResultatPageComponent;
  let fixture: ComponentFixture<ResultatPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ResultatPageComponent],
    providers: [
        { provide: SnackbarService, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
    ]
}).compileComponents();

    fixture = TestBed.createComponent(ResultatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ResultatPage component', () => {
    expect(component).toBeTruthy();
  });
});
