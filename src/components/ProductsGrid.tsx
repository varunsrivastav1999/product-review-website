import {useEffect, useState} from "react";
import {ProductStore} from "../models/product-store.model";
import {useSelector} from "react-redux";
import {RootStore} from "../models/root-store.model";
import {productSelector} from "../store/selectors/product.selector";
import {useRouter} from "next/router";
import {Product} from "../models/product.model";

export const ProductsGrid = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const productStore: ProductStore = useSelector((state: RootStore) => productSelector(state));
    const router = useRouter();

    useEffect(() => {
        setProducts(productStore.products)
    }, [productStore.products]);

    const onProductSelect = (productId: number) => {
        router.push(`/products/${productId}`)
    }

    const getProduct = (product: Product) => {
        return (
            <div className="product-item" key={product.id} onClick={() => onProductSelect(product.id)}>
                <div className="product-image">
                    <img src={product.image} alt=""/>
                </div>

                <div className="product-details">
                    <span className="product-title">{product.title}</span>
                    <span className="product-description">{product.description}</span>
                    <span className="product-category">{product.category}</span>
                    <div className="product-info">
                        <span className="product-price">$$ {product.price}</span>
                        <div className="product-stats">
                            <span className="product-rating">{product.rating.rate}</span>
                            <span className="product-user-count">({product.rating.count})</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="product-grids-container">
            {
                products.map(getProduct)
            }
        </div>
    )
}
