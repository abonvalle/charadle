import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EnvironmentService } from '@core/services/environment.service';
import { ThemeService } from '@core/services/theme.service';
import { theme, version, versions } from '@models/*';
import { Subject, takeUntil } from 'rxjs';
import { AboutDialogComponent } from '../about-dialog/about-dialog.component';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import { IssueReportDialogComponent } from '../issue-report-dialog/issue-report-dialog.component';
import { SettingsDialogComponent } from '../settings-dialog/settings.component';

@Component({
  selector: 'topbar',
  templateUrl: 'topbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent implements OnInit, OnDestroy {
  _destroy$: Subject<void> = new Subject();
  themeList$ = this._themeServ.themeList$;
  currentThemeId$ = this._themeServ.selectedThemeId$;
  versions = Object.values(versions);
  constructor(
    public envServ: EnvironmentService,
    private _dialog: MatDialog,
    private _themeServ: ThemeService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.currentThemeId$.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this._cdr.detectChanges();
    });
  }
  ngOnDestroy(): void {
    this._destroy$?.next();
    this._destroy$?.unsubscribe();
  }
  openHelp(): void {
    this._dialog.open(HelpDialogComponent);
  }
  openSettings(): void {
    this._dialog.open(SettingsDialogComponent);
  }
  openAbout(): void {
    this._dialog.open(AboutDialogComponent);
  }
  changeTheme(id: string): void {
    this._themeServ.updateTheme(id);
  }
  changeVersion(version: version): void {
    this.envServ.setVersion(version);
  }
  reportIssue(): void {
    this._dialog.open(IssueReportDialogComponent);
  }
  isCurrentTheme(id: string): boolean {
    return this.currentThemeId$.value === id;
  }
  trackByFn(_index: number, item: theme) {
    return item.id;
  }
}
