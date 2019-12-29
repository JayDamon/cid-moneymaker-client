import { AccountType } from './AccountType';
import { AccountClassification } from './AccountClassification';

export interface FinancialAccount {
    id: number;
    name: string;
    type: AccountType;
    startingBalance: number;
    currentBalance: number;
    classification: AccountClassification;
    isPrimary: boolean;
    isInCashFlow: boolean;
}