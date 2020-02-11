import { ChartsModule } from 'angular-bootstrap-md';
import { NgModule } from "@angular/core";
import { BudgetComponent } from './pages/budget/budget.component';
import { BudgetSummaryChartComponent } from './components/budget-summary-chart/budget-summary-chart.component';
import { SharedModule } from 'src/app/shared/SharedModule';
import { MatGridListModule } from '@angular/material/grid-list';
import { BudgetRoutingModule } from './budget-routing.module';
import { NewBudgetComponent } from './pages/new-budget/new-budget.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BudgetTypeInputComponent } from './components/budget-type-input/budget-type-input.component';
import { BudgetSidePanelComponent } from './components/budget-side-panel/budget-side-panel.component';
import { BudgetDetailsComponent } from './pages/budget-details/budget-details.component';
import { BudgetTableComponent } from './components/budget-table/budget-table.component';

@NgModule({
    declarations: [
        BudgetComponent,
        BudgetSummaryChartComponent,
        NewBudgetComponent,
        BudgetTypeInputComponent,
        BudgetSidePanelComponent,
        BudgetDetailsComponent,
        BudgetTableComponent
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