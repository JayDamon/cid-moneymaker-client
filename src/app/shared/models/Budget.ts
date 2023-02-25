import {TransactionBudgetCategory} from './TransactionBudgetCategory';
import {v4 as uuid} from 'uuid'

export interface Budget {
  id?: uuid;
  name: string; // budgetItemName
  startDate: Date;
  endDate: Date;
  frequencyTypeId: number;
  frequencyType: string;
  amount: number;
  inUse: boolean;
  budgetCategory: TransactionBudgetCategory;
}
