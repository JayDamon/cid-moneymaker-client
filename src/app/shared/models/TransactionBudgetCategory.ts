import {v4 as uuid} from 'uuid'

export interface TransactionBudgetCategory {
    id: uuid;
    nameId: uuid;
    name: string;
    typeId: uuid;
    type: string;
}
