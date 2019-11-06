import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserHomeComponent } from './home/pages/user-home/user-home.component';
import { TransactionsComponent } from './transaction/pages/transactions/transactions.component';
import { BudgetComponent } from './budget/pages/budget/budget.component';

const routes: Routes = [
  {
    path: 'home', 
    component: UserHomeComponent 
  },
  {
    path: 'transactions', 
    component: TransactionsComponent 
  },
  {
    path: 'budget',
    component: BudgetComponent
  },
  // {
  //   path: '**', component: PageNotFoundComponent
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
