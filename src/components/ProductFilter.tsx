import {NextPage} from "next";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {ProductStore} from "../models/product-store.model";
import {useSelector} from "react-redux";
import {RootStore} from "../models/root-store.model";
import {productSelector} from "../store/selectors/product.selector";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export const ProductFilter: NextPage = () => {
    const [products, setProducts] = useState<any[]>([]);
    const productStore: ProductStore = useSelector((state: RootStore) => productSelector(state));
    const router = useRouter();
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const mappedProducts = productStore.products.map(product => ({
            label: product.title,
            value: product.id
        }));
        setProducts(mappedProducts)
    }, [productStore.products]);

    const onProductSelect = (productId: number) => {
        router.push(`/products/${productId}`)
    }

    return (
        <div className={"product-filter-container" + (inputValue ? ' hide-label' : '')}>
            <Autocomplete
                onInputChange={(event, value) => setInputValue(value)}
                noOptionsText="No products found"
                disableClearable
                size="small"
                options={products}
                onChange={(event, option: { value: number, label: string }) => onProductSelect(option.value)}
                renderInput={(params) => (
                    <TextField {...params} label="Filter Products" variant="standard" />
                )}
            />
        </div>
    )
}
