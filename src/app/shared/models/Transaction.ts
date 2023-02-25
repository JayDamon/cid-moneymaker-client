import {Budget} from './Budget';
import {FinancialAccount} from './FinancialAccount';
import {Category} from './Category';
import {v4 as uuid} from 'uuid'

export interface Transaction {
    id: uuid;
    amount: uuid;
    description: string;
    date: Date;
    account: FinancialAccount;
    budget: Budget;
    category: Category;
}
