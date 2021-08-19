import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StartBudgetsComponent } from './start-budgets.component';

describe('StartBudgetsComponent', () => {
  let component: StartBudgetsComponent;
  let fixture: ComponentFixture<StartBudgetsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StartBudgetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartBudgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
