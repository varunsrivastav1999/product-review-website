import {StoreActionType} from "../../enums/store-action-type.enum";
import {StoreAction} from "../../models/store-action.model";
import {Product} from "../../models/product.model";

/* Actions handled by saga */
export const fetchProducts = (): StoreAction => ({
    type: StoreActionType.FETCH_ALL_PRODUCTS
}) 


/* Actions directly changing store state */
export const saveProducts = (products: Product[]): StoreAction => ({
    type: StoreActionType.SAVE_PRODUCTS,
    payload: { products }
})
