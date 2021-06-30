import { Budget } from 'src/app/shared/models/Budget';
import { Transaction } from 'src/app/shared/models/Transaction';

export interface BudgetCount {
  budget: Budget;
  count: number;
  transactions: Array<Transaction>;
}
