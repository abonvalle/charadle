import { TestBed } from '@angular/core/testing';
import { SnackbarService } from './snackbar.service';
import { XHRService } from './xhr.service';

describe('XHRService', () => {
  let service: XHRService;
  // let snackbarServiceSpy: jasmine.SpyObj<SnackbarService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('SnackbarService', ['defaultErrorMsg']);
    TestBed.configureTestingModule({ providers: [XHRService, { provide: SnackbarService, useValue: spy }] });
    service = TestBed.inject(XHRService);
    // snackbarServiceSpy = TestBed.inject(SnackbarService) as jasmine.SpyObj<SnackbarService>;

    spyOn(XMLHttpRequest.prototype, 'open').and.callThrough();
    spyOn(XMLHttpRequest.prototype, 'send');
  });

  it('should open proper XMLHttpRequest', function () {
    service.reportPHP({});

    expect(XMLHttpRequest.prototype.open).toHaveBeenCalled();
  });

  it('should send proper data', function () {
    service.reportPHP({});

    expect(XMLHttpRequest.prototype.send).toHaveBeenCalled();
  });
});
