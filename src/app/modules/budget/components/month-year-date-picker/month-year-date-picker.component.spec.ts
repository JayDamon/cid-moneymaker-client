import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthYearDatePickerComponent } from './month-year-date-picker.component';

describe('MonthYearDatePickerComponent', () => {
  let component: MonthYearDatePickerComponent;
  let fixture: ComponentFixture<MonthYearDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthYearDatePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthYearDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
