import { Category } from './category.model';
export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    brand: string;
    code: string;
    color: string;
    categoryId: number;
    establishmentId: number;
    image: string;
    isEnable: number;
}
