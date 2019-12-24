import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsPanelComponent } from './ingredients-panel.component';

describe('IngredientsPanelComponent', () => {
  let component: IngredientsPanelComponent;
  let fixture: ComponentFixture<IngredientsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
