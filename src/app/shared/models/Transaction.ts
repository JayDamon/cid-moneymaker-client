import { Budget } from './Budget';
import { FinancialAccount } from './FinancialAccount';
import { Category } from './Category';

export interface Transaction {
    id: number;
    amount: number;
    description: string;
    date: Date;
    account: FinancialAccount;
    budget: Budget;
    category: Category;
}