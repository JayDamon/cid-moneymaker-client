import { Component, OnInit } from '@angular/core';


export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-month-year-date-picker',
  templateUrl: './month-year-date-picker.component.html',
  styleUrls: ['./month-year-date-picker.component.scss']
})
export class MonthYearDatePickerComponent implements OnInit {

  date = new Date();
  label = "Select first month chart";

  constructor() { }

  ngOnInit(): void {
  }

}
