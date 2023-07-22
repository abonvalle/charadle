import { defaultSettings } from '../../../models/default-settings';
import { Keyboard } from '../../../models/keyboard';
import { APIService } from './api.service';
import { LocalStorageService } from './local-storage.service';

describe('APIService', () => {
  let service: APIService;
  // let wordle: Wordle;
  beforeEach(() => {
    service = new APIService(new LocalStorageService());
    // wordle = new Wordle({ date: '', text: '', serie: '', imgPath: '', fullname: '' });
  });

  // it('#getBoardgame should return BoardGame or null', () => {
  //   const bg = service.getBoardgame();
  //   const isABoardGame = bg instanceof BoardGame;
  //   const isNull = bg === null;

  //   expect(isABoardGame || isNull).toBeTrue();
  // });

  // it('#setBoardgame should be called', () => {
  //   spyOn(service, 'setBoardgame').and.callThrough();
  //   service.setBoardgame(new BoardGame({ wordle }));
  //   expect(service.setBoardgame).toHaveBeenCalled();
  // });

  // it('#deleteBoardgame should be called', () => {
  //   spyOn(service, 'deleteBoardgame').and.callThrough();
  //   service.deleteBoardgame();
  //   expect(service.deleteBoardgame).toHaveBeenCalled();
  // });

  // it('#getJokers should return jokers or null', () => {
  //   const joks = service.getJokers(wordle);
  //   const isNull = joks === null;
  //   const jokers =
  //     joks?.paintJoker instanceof PaintJoker &&
  //     joks.placeLetterJoker instanceof PlaceLetterJoker &&
  //     joks.serieJoker instanceof SerieJoker;

  //   expect(jokers || isNull).toBeTrue();
  // });

  // it('#setJokers should be called', () => {
  //   spyOn(service, 'setJokers').and.callThrough();
  //   service.setJokers({
  //     paintJoker: new PaintJoker(),
  //     placeLetterJoker: new PlaceLetterJoker(),
  //     serieJoker: new SerieJoker()
  //   });
  //   expect(service.setJokers).toHaveBeenCalled();
  // });

  // it('#deleteJokers should be called', () => {
  //   spyOn(service, 'deleteJokers').and.callThrough();
  //   service.deleteJokers();
  //   expect(service.deleteJokers).toHaveBeenCalled();
  // });

  it('#getKeyboard should return Keyboard', () => {
    const kb = service.getKeyboard();
    expect(kb instanceof Keyboard).toBeTrue();
  });

  it('#setKeyboard should be called', () => {
    spyOn(service, 'setKeyboard').and.callThrough();
    service.setKeyboard('AZERTY');
    expect(service.setKeyboard).toHaveBeenCalled();
  });

  it('#deleteKeyboard should be called', () => {
    spyOn(service, 'deleteKeyboard').and.callThrough();
    service.deleteKeyboard();
    expect(service.deleteKeyboard).toHaveBeenCalled();
  });

  it('#getSettings should return Settings', () => {
    const settings = service.getSettings();
    const isSettingsOk =
      typeof settings?.colorBlindMode === 'boolean' &&
      typeof settings.firstTime === 'boolean' &&
      typeof settings.hideKeyboard === 'boolean';
    expect(isSettingsOk).toBeTrue();
  });

  it('#setSettings should be called', () => {
    spyOn(service, 'setSettings').and.callThrough();
    service.setSettings(defaultSettings);
    expect(service.setSettings).toHaveBeenCalled();
  });

  it('#deleteSettings should be called', () => {
    spyOn(service, 'deleteSettings').and.callThrough();
    service.deleteSettings();
    expect(service.deleteSettings).toHaveBeenCalled();
  });

  it('#deleteAll should be called', () => {
    spyOn(service, 'deleteAll').and.callThrough();
    service.deleteAll();
    expect(service.deleteAll).toHaveBeenCalled();
  });
});
