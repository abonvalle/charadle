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
  themes = this._environmentVersion === 'serie' ? themesSerie : themesAnime;
  charactersInfosJSON = this._environmentVersion === 'serie' ? charactersInfosJSONSerie : charactersInfosJSONAnime;
  wordlesJSON = this._environmentVersion === 'serie' ? wordlesJSONSerie : wordlesJSONAnime;
  constructor() {}
}
