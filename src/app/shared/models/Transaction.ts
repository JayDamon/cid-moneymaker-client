import { Budget } from './Budget';
import { FinancialAccount } from './FinancialAccount';
import { Category } from './Category';

export interface Transaction {
    // accountName: string;
    // accountId: number;
    // budgetName: string;
    // budgetId: number;
    // budgetCategoryId: number;
    // budgetCategoryType: string;
    // budgetCategoryTypeId: number;
    // budgetCategoryName: string;
    // budgetCategoryNameId: number;
    // transactionCategory: string;
    // transactionCategoryId: number;
    // transactionTypeName: string;
    // transactionTypeId: number;
    // amount: number;
    // description: string;
    // date: Date;
    // formattedDate: string;

    id: number;
    amount: number;
    description: string;
    date: Date;
    account: FinancialAccount;
    budget: Budget;
    category: Category;
}