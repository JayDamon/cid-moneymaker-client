import { BudgetSummary } from './../../../../shared/models/BudgetSummary';
import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-budget-summary-chart',
  templateUrl: './budget-summary-chart.component.html',
  styleUrls: ['./budget-summary-chart.component.css']
})
export class BudgetSummaryChartComponent implements OnInit, OnChanges  {

  @Input() budgetSummary: BudgetSummary[];

  public chartDatasets: Array<any> = [
      { data: [], label: 'My First dataset' }
    ];

  public chartColors: Array<any> = [
    { data: [], label: 'data' }
  ];

  public chartLabels: Array<any> = [];

  ngOnInit(): void {
    this.addBudgets();
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.addBudgets();
  }


  addBudgets() {
      if (this.budgetSummary != null) {
        let planned = new Array();
        let actual = new Array();
        let categories = new Array();
        let colors = new Array();
        let red = '#B71C1C';
        let green = '#2E7D32';
        
          for (let bs of this.budgetSummary) {
            planned.push(bs.planned);
            actual.push(bs.actual);
            if (bs.expected) {
              colors.push(green);
            } else {
              colors.push(red);
            }
            const cat = bs.category.charAt(0).toUpperCase() + bs.category.slice(1);
            const tranType = bs.transactionType.charAt(0).toUpperCase() + bs.transactionType.slice(1);
            categories.push(cat + " " + tranType);
          }

        this.chartDatasets = [
          {
            data: planned, 
            label: 'Planned',
          },
          {
            data: actual,
            label: 'Actual',
          }
        ];

        this.chartColors = [
            {
              backgroundColor: 'black',
              borderWidth: 1
            },
            {
              backgroundColor: colors,
              borderWidth: 1
            }
        ]

        this.chartLabels = categories;
    }

  }

  public chartType: string = 'bar';

  public chartOptions: any = {
    responsive: true,
    legend: {
      display: false
    },
  };

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}
