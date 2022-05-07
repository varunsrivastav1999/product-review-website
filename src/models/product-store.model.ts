import {Product} from "./product.model";

export interface ProductStore {
    loading: boolean;
    loaded: boolean;
    products: Product[];
}
