import { ChartsModule } from 'angular-bootstrap-md';
import { NgModule } from "@angular/core";
import { BudgetComponent } from './pages/budget/budget.component';
import { BudgetSummaryChartComponent } from './components/budget-summary-chart/budget-summary-chart.component';
import { SharedModule } from 'src/app/shared/SharedModule';
import { MatGridListModule } from '@angular/material/grid-list';
import { BudgetRoutingModule } from './budget-routing.module';
import { NewBudgetComponent } from './pages/new-budget/new-budget.component';
import { MatInputModule, MatButtonModule, MatCheckboxModule, MatSidenavModule, MatTreeModule, MatIconModule, MatTableModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
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