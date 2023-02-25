import {BudgetCategory} from './BudgetCategory';
import {v4 as uuid} from 'uuid'

export interface BudgetType {
    id: uuid;
    type: string;
    budgetCategories: Array<BudgetCategory>;
}
