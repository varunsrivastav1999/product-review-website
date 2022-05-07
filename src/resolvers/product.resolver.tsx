import {useDispatch, useSelector} from "react-redux";
import {productSelector} from "../store/selectors/product.selector";
import {RootStore} from "../models/root-store.model";
import React, {useEffect} from "react";
import {ProductStore} from "../models/product-store.model";
import {Else, If, Then} from "react-if";
import {SpinnerService} from "../services/core/spinner.service";
import {getRandomColor} from "../utils/random-color.utils";
import {fetchProducts} from "../store/actions/product.action";

export const ProductResolver = (WrappedComponent: any) => () => {
    const productStore: ProductStore = useSelector((state: RootStore) => productSelector(state));
    const spinnerService = SpinnerService.getInstance();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [])

    return (
        <If condition={productStore.loading && !productStore.loaded}>
            <Then>
                <div className="w-screen h-screen flex flex-col justify-center items-center">
                    {spinnerService.getRandomSpinners()}
                    <p className="mt-14 text-center" style={{color: getRandomColor()}}>Please wait while we load data from our servers.</p>
                </div>
            </Then>
            <Else>
                <WrappedComponent />
            </Else>
        </If>
    )
}
