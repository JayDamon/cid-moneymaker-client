import { BudgetCategory } from './BudgetCategory';
import { BudgetType } from 'src/app/shared/models/BudgetType';
export interface BudgetTypeTreeNode {
    name: string;
    budgetType: BudgetType;
    budgetCategory: BudgetCategory;
    children?: BudgetTypeTreeNode[];
}