import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BudgetCountComponent } from './budget-count.component';

describe('BudgetCountComponent', () => {
  let component: BudgetCountComponent;
  let fixture: ComponentFixture<BudgetCountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
