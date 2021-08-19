
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetComponent } from './pages/budget/budget.component';
import { StartBudgetsComponent } from './pages/start-budgets/start-budgets.component';
import { BudgetDetailsComponent } from './pages/budget-details/budget-details.component';
import { NewBudgetComponent } from './components/new-budget/new-budget.component';

const budgetRoutes: Routes = [
    {
        path: 'budgets',
        component: BudgetDetailsComponent
    },
    {
        path: 'newBudgets',
        component: StartBudgetsComponent
    },
    {
        path: 'budget-overview',
        component: BudgetComponent
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
