import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '@core/services/snackbar.service';
import { NameReportDialogComponent } from './name-report-dialog.component';

describe('NameReportDialogComponent', () => {
  let component: NameReportDialogComponent;
  let fixture: ComponentFixture<NameReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MatDialogModule, NameReportDialogComponent],
    providers: [
        { provide: SnackbarService, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { name: 'ed' } },
        { provide: MatDialogRef, useValue: {} }
    ]
}).compileComponents();

    fixture = TestBed.createComponent(NameReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create NameReportDialog component', () => {
    expect(component).toBeTruthy();
  });
});
