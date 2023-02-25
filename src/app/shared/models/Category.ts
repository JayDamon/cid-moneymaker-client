import {SubCategory} from './SubCategory';
import {v4 as uuid} from 'uuid'

export interface Category {
    id: uuid;
    name: string;
    subCategory: SubCategory;
}
