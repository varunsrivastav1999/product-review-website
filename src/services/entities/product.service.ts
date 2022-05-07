import {Product} from "../../models/product.model";
import {ApiService} from "../core/api.service";

export class ProductService {
    private static _instance: ProductService;
    private _apiService = ApiService.getInstance();

    static getInstance(): ProductService {
        if (!ProductService._instance) {
            ProductService._instance = new ProductService();
        }
        return ProductService._instance;
    }

    getProducts(): Promise<Product[]> {
        return this._apiService.get('/products');
    }

    updateProduct(productId: number, updateProductData: Product): Promise<Product> {
        return this._apiService.put(`/products/${productId}`, updateProductData);
    }
}
