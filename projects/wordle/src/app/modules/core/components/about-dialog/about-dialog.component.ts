import { CdkScrollable } from '@angular/cdk/scrolling';
import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { ThemeService } from '@core/services/theme.service';
import { theme } from '@models';
import packageJson from '@packageJSON';
import { Observable, map } from 'rxjs';
@Component({
  selector: 'about-dialog',
  templateUrl: 'about-dialog.component.html',
  imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatDialogActions, MatButton, MatDialogClose, AsyncPipe]
})
export class AboutDialogComponent {
  readonly contactAddress: string = 'charadle@abvdev.fr';
  version: string = packageJson.version;
  currentTheme$: Observable<theme> = this._themeServ.activeTheme$;
  themeLabel$: Observable<string> = this.currentTheme$.pipe(map((th) => th.name ?? ''));
  themeCredits$: Observable<{ text: string; url: string }[]> = this.currentTheme$.pipe(map((th) => th.copyright ?? []));
  constructor(private _themeServ: ThemeService) {}
}
