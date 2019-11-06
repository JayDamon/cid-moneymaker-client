import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetSidePanelComponent } from './budget-side-panel.component';

describe('BudgetSidePanelComponent', () => {
  let component: BudgetSidePanelComponent;
  let fixture: ComponentFixture<BudgetSidePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetSidePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
