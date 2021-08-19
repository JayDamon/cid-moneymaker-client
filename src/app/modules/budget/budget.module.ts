import { ChartsModule } from 'angular-bootstrap-md';
import { NgModule } from "@angular/core";
import { BudgetComponent } from './pages/budget/budget.component';
import { BudgetSummaryChartComponent } from './components/budget-summary-chart/budget-summary-chart.component';
import { SharedModule } from 'src/app/shared/SharedModule';
import { MatGridListModule } from '@angular/material/grid-list';
import { BudgetRoutingModule } from './budget-routing.module';
import { StartBudgetsComponent } from './pages/start-budgets/start-budgets.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';
import { BudgetTypeInputComponent } from './components/budget-type-input/budget-type-input.component';
import { BudgetSidePanelComponent } from './components/budget-side-panel/budget-side-panel.component';
import { BudgetDetailsComponent } from './pages/budget-details/budget-details.component';
import { BudgetTableComponent } from './components/budget-table/budget-table.component';
import { MonthYearDatePickerComponent } from './components/month-year-date-picker/month-year-date-picker.component';
import { NewBudgetComponent } from './components/new-budget/new-budget.component';

@NgModule({
    declarations: [
        BudgetComponent,
        BudgetSummaryChartComponent,
        StartBudgetsComponent,
        BudgetTypeInputComponent,
        BudgetSidePanelComponent,
        BudgetDetailsComponent,
        BudgetTableComponent,
        MonthYearDatePickerComponent,
        NewBudgetComponent
    ],
    imports: [
        SharedModule,
        BudgetRoutingModule,
        MatGridListModule,
        ChartsModule,
        MatSidenavModule,
        MatTreeModule,
        MatIconModule,
        MatTableModule,
        MatNativeDateModule
    ],
    providers: [

    ]
})
export class BudgetModule{ }
