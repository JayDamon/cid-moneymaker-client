import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCountComponent } from './budget-count.component';

describe('BudgetCountComponent', () => {
  let component: BudgetCountComponent;
  let fixture: ComponentFixture<BudgetCountComponent>;

  beforeEach(async(() => {
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
