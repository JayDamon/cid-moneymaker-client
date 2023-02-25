import {BudgetItem} from './BudgetItem';
import {v4 as uuid} from 'uuid'

export interface BudgetCategory {
    id: uuid;
    name: string;
    budgetItems: Array<BudgetItem>;
}
