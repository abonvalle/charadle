import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogRef } from '@angular/material/dialog';
import { SettingsService } from '@core/services/settings.service';
import { SnackbarService } from '@core/services/snackbar.service';
import { MainPageComponent } from './main-page.component';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MainPageComponent],
    providers: [
        { provide: SettingsService, useValue: {} },
        { provide: SnackbarService, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
    ]
}).compileComponents();

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create MainPage component', () => {
    expect(component).toBeTruthy();
  });
});
