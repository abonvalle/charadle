import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogModule } from '@angular/material/dialog';
import { AboutDialogComponent } from './about-dialog.component';
//class MockUpThemeService {
//  activeThemeId$ = true;
//  user = { name: 'Test User' };
//}
describe('AboutDialogComponent', () => {
  let component: AboutDialogComponent;
  let fixture: ComponentFixture<AboutDialogComponent>;
  //let themeServ: MockUpThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutDialogComponent],
      imports: [MatDialogModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // themeServ = TestBed.inject(MockUpThemeService);
  });

  it('should create AboutDialog component', () => {
    expect(component).toBeTruthy();
  });

  it('should instanciate a contact address', () => {
    expect(component.contactAddress).toBeDefined();
    expect(component.contactAddress).toContain('@abvdev.fr');
  });

  it('should instanciate a label', () => {
    expect(component.label).toBeDefined();
  });

  it('should instanciate a version', () => {
    expect(component.version).toBeDefined();
  });

  it('should contain a contact address', () => {
    const AboutDialogElement: HTMLElement = fixture.nativeElement;
    expect(AboutDialogElement.querySelector('p[name="contact"]')?.textContent).toContain(component.contactAddress);
  });

  it('should retrieve the current theme', () => {
    component.currentTheme$.subscribe((theme) => expect(theme).toBeDefined());
  });
  it('should retrieve the current theme label', () => {
    component.themeLabel$.subscribe((theme) => expect(theme).toBeDefined());
  });
  it('should retrieve the current theme credits', () => {
    component.themeCredits$.subscribe((theme) => expect(theme).toBeDefined());
  });
});
