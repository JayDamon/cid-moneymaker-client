export interface Transaction {
    accountName: string;
    accountId: number;
    budgetName: string;
    budgetId: number;
    budgetCategoryId: number;
    budgetCategoryType: string;
    budgetCategoryTypeId: number;
    budgetCategoryName: string;
    budgetCategoryNameId: number;
    transactionCategory: string;
    transactionCategoryId: number;
    transactionTypeName: string;
    transactionTypeId: number;
    amount: number;
    description: string;
    date: Date;
    formattedDate: string;
}