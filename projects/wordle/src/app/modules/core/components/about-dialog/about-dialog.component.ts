import { Component } from '@angular/core';
import { environment } from '@config/environment';
import { ThemeService } from '@core/services/theme.service';
import { theme } from '@models/*';
import packageJson from '@packageJSON';
import { Observable, map } from 'rxjs';
@Component({
  selector: 'about-dialog',
  templateUrl: 'about-dialog.component.html'
})
export class AboutDialogComponent {
  label: string = environment.version.label;
  version: string = packageJson.version;
  currentTheme$: Observable<theme | undefined> = this._themeServ.activeThemeId$.pipe(
    map((thId) => this._themeServ.themeList.find((t) => t.id === thId))
  );
  themeLabel$: Observable<string> = this.currentTheme$.pipe(map((th) => th?.name ?? ''));
  themeCredits$: Observable<{ text: string; url: string }[]> = this.currentTheme$.pipe(
    map((th) => th?.copyright ?? [])
  );
  constructor(private _themeServ: ThemeService) {}
}
