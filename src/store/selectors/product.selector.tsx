import {RootStore} from "../../models/root-store.model";

export const productSelector = (state: RootStore) => state.productReducer;
