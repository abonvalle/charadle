import { AssetsService } from './assets.service';

describe('AssetsService', () => {
  let service: AssetsService;
  beforeEach(() => {
    service = new AssetsService();
  });

  it('themes should be instancied', () => {
    expect(service.themes).toBeDefined();
  });
  it('charactersInfosJSON should be instancied', () => {
    expect(service.charactersInfosJSON).toBeDefined();
  });
  it('wordlesJSON should be instancied', () => {
    expect(service.wordlesJSON).toBeDefined();
  });

  it('themes should be an array of theme', () => {
    const isArray = Array.isArray(service.themes);
    const isArrayOfTheme = service.themes.every(
      (t) => typeof t.id === 'string' && t.id !== '' && typeof t.name === 'string' && t.name !== ''
    );
    expect(isArray && isArrayOfTheme).toBeTrue();
  });
  it('charactersInfosJSON first object should be accessible and have a from property', () => {
    const keys = Object.keys(service.charactersInfosJSON);
    let test = false;
    if (keys.length > 0 && keys[0] !== undefined) {
      const key = keys[0] as keyof typeof service.charactersInfosJSON;
      const character = service.charactersInfosJSON[key];
      test = typeof character.from === 'string';
    }

    expect(test).toBeTrue();
  });
  it('wordlesJSON should be an array of strings', () => {
    const isArray = Array.isArray(service.wordlesJSON);
    const isArrayOfString = service.wordlesJSON.every((s) => typeof s === 'string');
    expect(isArray && isArrayOfString).toBeTrue();
  });
});
