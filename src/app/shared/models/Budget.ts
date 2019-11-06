import { TransactionBudgetCategory } from './TransactionBudgetCategory';

export interface Budget {
    id: number;
    name: string; // budgetItemName
    startDate: Date;
    frequencyTypeId: number;
    frequencyType: string;
    amount: number;
    inUse: boolean;
    budgetCategory: TransactionBudgetCategory;
}