export interface BudgetSummary {
    transactionType: String;
    category: string;
    month: number;
    monthText: string;
    year: number;
    planned:number;
    actual: number;
    expected: boolean;
}