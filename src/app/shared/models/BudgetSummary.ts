export interface BudgetSummary {
    category: string;
    month: number;
    monthText: string;
    year: number;
    planned:number;
    actual: number;
    expected: boolean;
}