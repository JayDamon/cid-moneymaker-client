import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BudgetSidePanelComponent } from './budget-side-panel.component';

describe('BudgetSidePanelComponent', () => {
  let component: BudgetSidePanelComponent;
  let fixture: ComponentFixture<BudgetSidePanelComponent>;

  beforeEach(waitForAsync(() => {
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
