import { Injectable, OnDestroy } from '@angular/core';
import * as charactersInfosJSONAnime from '@assets-anime/jsons/characters.json';
import themesAnime from '@assets-anime/jsons/themes.json';
import wordlesJSONAnime from '@assets-anime/jsons/wordles.json';
import * as charactersInfosJSONSerie from '@assets-series/jsons/characters.json';
import themesSerie from '@assets-series/jsons/themes.json';
import wordlesJSONSerie from '@assets-series/jsons/wordles.json';
import { BehaviorSubject, Subscription } from 'rxjs';
import { theme } from '../../../models/theme.interface';
import { EnvironmentService } from './environment.service';

@Injectable({ providedIn: 'root' })
export class AssetsService implements OnDestroy {
  themes$: BehaviorSubject<theme[]>;
  charactersInfosJSON$: typeof charactersInfosJSONSerie | typeof charactersInfosJSONAnime;
  wordlesJSON$: string[];
  sub$: Subscription;
  constructor(private _envServ: EnvironmentService) {
    switch (this._envServ.version$.value.code) {
      case 'anime':
        this.themes$ = new BehaviorSubject<theme[]>(themesAnime.themes);
        this.charactersInfosJSON$ = charactersInfosJSONAnime;
        this.wordlesJSON$ = wordlesJSONAnime;
        break;

      case 'serie':
      default:
        this.themes$ = new BehaviorSubject<theme[]>(themesSerie.themes);
        this.charactersInfosJSON$ = charactersInfosJSONSerie;
        this.wordlesJSON$ = wordlesJSONSerie;
        break;
    }

    this.sub$ = this._envServ.version$.subscribe((version) => {
      switch (version.code) {
        case 'anime':
          this.themes$.next(themesAnime.themes);
          this.charactersInfosJSON$ = charactersInfosJSONAnime;
          this.wordlesJSON$ = wordlesJSONAnime;
          break;

        case 'serie':
        default:
          this.themes$.next(themesSerie.themes);
          this.charactersInfosJSON$ = charactersInfosJSONSerie;
          this.wordlesJSON$ = wordlesJSONSerie;
          break;
      }
    });
  }
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
