import {Product} from "../../models/product.model";
import {call, put, takeLatest} from "@redux-saga/core/effects";
import {ProductService} from "../../services/entities/product.service";
import {saveProducts} from "../actions/product.action";
import {StoreActionType} from "../../enums/store-action-type.enum";

const productService = ProductService.getInstance();

function* fetchProducts() {
    const products: Product[] = yield call(() => productService.getProducts())
    if (products.length) {
        yield put(saveProducts(products))
    }
}

export function* productWatcher() {
    yield takeLatest(StoreActionType.FETCH_ALL_PRODUCTS, fetchProducts)
}
