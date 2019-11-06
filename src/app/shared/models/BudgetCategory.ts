import { BudgetItem } from './BudgetItem';

export interface BudgetCategory {
    id: number;
    name: string;
    budgetItems: Array<BudgetItem>;
}