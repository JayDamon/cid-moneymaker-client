import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserHomeComponent } from './home/pages/user-home/user-home.component';
import { TransactionsComponent } from './transaction/pages/transactions/transactions.component';
import { ImportTransactionsComponent } from './transaction/pages/import-transactions/import-transactions.component';

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
    path: 'transactions-import',
    component: ImportTransactionsComponent
  }
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
