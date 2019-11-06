import { BudgetCategory } from './BudgetCategory';

export interface BudgetType {
    id: number;
    type: string;
    budgetCategories: Array<BudgetCategory>;
}