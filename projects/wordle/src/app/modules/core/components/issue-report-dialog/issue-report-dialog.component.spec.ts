import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '@core/services/snackbar.service';
import { IssueReportDialogComponent } from './issue-report-dialog.component';

describe('IssueReportDialogComponent', () => {
  let component: IssueReportDialogComponent;
  let fixture: ComponentFixture<IssueReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssueReportDialogComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: SnackbarService, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IssueReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create IssueReportDialog component', () => {
    expect(component).toBeTruthy();
  });
});
