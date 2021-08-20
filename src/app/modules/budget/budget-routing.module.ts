
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetOverviewComponent } from './pages/budget-overview/budget-overview.component';
import { StartBudgetsComponent } from './pages/start-budgets/start-budgets.component';
import { BudgetDetailsComponent } from './pages/budget-details/budget-details.component';
import { NewBudgetComponent } from './components/new-budget/new-budget.component';

const budgetRoutes: Routes = [
    {
        path: 'budgets',
        component: BudgetDetailsComponent
    },
    {
        path: 'new-budgets',
        component: StartBudgetsComponent
    },
    {
        path: 'budget-overview',
        component: BudgetOverviewComponent
    },
    {
        path: 'new-budgets',
        component: NewBudgetComponent
    }
];


@NgModule({
    imports: [
        RouterModule.forChild(budgetRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class BudgetRoutingModule { }
