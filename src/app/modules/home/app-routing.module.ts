import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { UserHomeComponent } from '../pages/user-home/user-home.component';

const routes: Routes = [
  {
    path: 'home', 
    component: UserHomeComponent 
  },
  {
    path: 'transactions', 
    component: TransactionsComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
