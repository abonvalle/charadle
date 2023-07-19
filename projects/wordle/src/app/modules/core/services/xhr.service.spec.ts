import { TestBed } from '@angular/core/testing';
import { XHRService } from './xhr.service';

describe('XHRService', () => {
  let service: XHRService;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [XHRService] });
    service = TestBed.inject(XHRService);
    spyOn(XMLHttpRequest.prototype, 'open').and.callThrough();
    spyOn(XMLHttpRequest.prototype, 'send');
  });

  it('should open proper XMLHttpRequest', function () {
    service.reportPHP(new FormData());

    expect(XMLHttpRequest.prototype.open).toHaveBeenCalled();
  });

  it('should send proper data', function () {
    service.reportPHP(new FormData());

    expect(XMLHttpRequest.prototype.send).toHaveBeenCalled();
  });
});
