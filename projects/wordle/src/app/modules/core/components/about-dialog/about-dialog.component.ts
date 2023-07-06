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
  readonly contactAddress: string = 'nameguessr@abvdev.fr';
  label: string = environment.version.label;
  version: string = packageJson.version;
  currentTheme$: Observable<theme> = this._themeServ.activeThemeId$.pipe(
    map((thId) => {
      const currentTheme = this._themeServ.themeList.find((t) => t.id === thId);
      if (!currentTheme) {
        throw new TypeError('currentTheme should be instanciated');
      }
      return currentTheme;
    })
  );
  themeLabel$: Observable<string> = this.currentTheme$.pipe(map((th) => th.name ?? ''));
  themeCredits$: Observable<{ text: string; url: string }[]> = this.currentTheme$.pipe(map((th) => th.copyright ?? []));
  constructor(private _themeServ: ThemeService) {}
}
