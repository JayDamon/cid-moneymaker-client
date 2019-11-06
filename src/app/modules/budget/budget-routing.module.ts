
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetComponent } from './pages/budget/budget.component';
import { NewBudgetComponent } from './pages/new-budget/new-budget.component';
import { BudgetDetailsComponent } from './pages/budget-details/budget-details.component';

const budgetRoutes: Routes = [
    {
        path: 'budget',
        component: BudgetComponent
    },
    {
        path: 'newBudget',
        component: NewBudgetComponent
    },
    {
        path: 'budgetDetails',
        component: BudgetDetailsComponent
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