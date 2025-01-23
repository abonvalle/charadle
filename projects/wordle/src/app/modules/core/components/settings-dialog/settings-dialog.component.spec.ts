import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogModule } from '@angular/material/dialog';
import { SettingsDialogComponent } from './settings.component';

describe('SettingsDialogComponent', () => {
  let component: SettingsDialogComponent;
  let fixture: ComponentFixture<SettingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MatDialogModule, SettingsDialogComponent]
}).compileComponents();

    fixture = TestBed.createComponent(SettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create SettingsDialog component', () => {
    expect(component).toBeTruthy();
  });
});
