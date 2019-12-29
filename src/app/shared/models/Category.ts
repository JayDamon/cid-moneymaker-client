import { SubCategory } from './SubCategory';
export interface Category {
    id: number;
    name: string;
    subCategory: SubCategory;
}
