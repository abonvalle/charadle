import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreModule } from '@core/core.module';
import { TopbarComponent } from './topbar.component';

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CoreModule, TopbarComponent]
}).compileComponents();

    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Topbar component', () => {
    expect(component).toBeTruthy();
  });
});
