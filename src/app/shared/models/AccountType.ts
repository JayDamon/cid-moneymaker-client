import {v4 as uuid} from 'uuid'

export interface AccountType {
    id: uuid;
    fullName: string;
    shortName: string;
}
