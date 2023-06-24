import { Injectable } from '@angular/core';
import * as charactersInfosJSONAnime from '@assets-anime/jsons/characters.json';
import themesAnime from '@assets-anime/jsons/themes.json';
import wordlesJSONAnime from '@assets-anime/jsons/wordles.json';
import * as charactersInfosJSONSerie from '@assets-series/jsons/characters.json';
import themesSerie from '@assets-series/jsons/themes.json';
import wordlesJSONSerie from '@assets-series/jsons/wordles.json';
import { environment } from '@config/environment';

@Injectable({ providedIn: 'root' })
export class AssetsService {
  private _environmentVersion = environment.version.code;
  //Todo handle multiple versions
  themes: typeof themesSerie | typeof themesAnime | null = null;
  charactersInfosJSON: typeof charactersInfosJSONSerie | typeof charactersInfosJSONAnime | null = null;
  wordlesJSON: typeof wordlesJSONSerie | typeof wordlesJSONAnime | null = null;
  constructor() {
    this._initAssets();
  }
  private _initAssets(): void {
    switch (this._environmentVersion) {
      case 'anime':
        this.themes = themesAnime;
        this.charactersInfosJSON = charactersInfosJSONAnime;
        this.wordlesJSON = wordlesJSONAnime;
        break;

      case 'serie':
      default:
        this.themes = themesSerie;
        this.charactersInfosJSON = charactersInfosJSONSerie;
        this.wordlesJSON = wordlesJSONSerie;
        break;
    }
  }
}
