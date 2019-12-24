import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrewPanelComponent } from './brew-panel.component';

describe('BrewPanelComponent', () => {
  let component: BrewPanelComponent;
  let fixture: ComponentFixture<BrewPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrewPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrewPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
