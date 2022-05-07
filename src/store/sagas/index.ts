import { all } from 'redux-saga/effects';
import {productWatcher} from "./product.saga";

export function* rootSaga() {
    yield all([
        productWatcher()
    ]);
}
