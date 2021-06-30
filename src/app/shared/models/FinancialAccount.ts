import { AccountType } from './AccountType';

export interface FinancialAccount {
    id: number;
    name: string;
    type: AccountType;
    startingBalance: number;
    currentBalance: number;
    isPrimary: boolean;
    isInCashFlow: boolean;
}
