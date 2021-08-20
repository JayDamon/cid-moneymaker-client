import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BudgetOverviewComponent } from './budget-overview.component';

describe('BudgetOverviewComponent', () => {
  let component: BudgetOverviewComponent;
  let fixture: ComponentFixture<BudgetOverviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
