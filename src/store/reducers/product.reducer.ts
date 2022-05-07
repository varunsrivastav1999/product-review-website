import {StoreAction} from "../../models/store-action.model";
import {Product} from "../../models/product.model";
import {StoreActionType} from "../../enums/store-action-type.enum";
import {ProductStore} from "../../models/product-store.model";

const _initialState: ProductStore = {
    loading: false,
    loaded: false,
    products: []
};

export const productReducer = (state: ProductStore = _initialState, action: StoreAction): ProductStore => {
    switch (action.type) {
        case StoreActionType.FETCH_ALL_PRODUCTS:
            return {
                ...state,
                loading: true,
            }

        case StoreActionType.SAVE_PRODUCTS: {
            const productsMap: { [productId: number]: Product } = {};
            [...state.products].forEach((product: Product) => productsMap[product.id] = product);
            [...(action.payload.products || [])].forEach((product: Product) => productsMap[product.id] = product);
            return {
                ...state,
                loaded: true,
                loading: false,
                products: Object.values(productsMap)
            }
        }
        default: return state;
    }
}
