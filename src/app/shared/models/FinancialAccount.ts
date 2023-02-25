import {AccountType} from './AccountType';
import {v4 as uuid} from 'uuid'

export interface FinancialAccount {
    id: uuid;
    name: string;
    type: AccountType;
    startingBalance: number;
    currentBalance: number;
    isPrimary: boolean;
    isInCashFlow: boolean;
}
