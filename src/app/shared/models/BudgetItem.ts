import {v4 as uuid} from 'uuid'

export interface BudgetItem {
    id: uuid;
    category: string;
    name: string;
}
