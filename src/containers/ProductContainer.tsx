import {NextPage} from "next";
import {Header} from "../components/Header";
import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import {ProductStore} from "../models/product-store.model";
import {useSelector} from "react-redux";
import {RootStore} from "../models/root-store.model";
import {productSelector} from "../store/selectors/product.selector";
import {Product} from "../models/product.model";
import {Else, If, Then} from "react-if";
import {ProductService} from "../services/entities/product.service";

export const ProductContainer: NextPage = () => {
    const [product, setProduct] = useState<Product>();
    const [review, setReview] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const productServiceRef = useRef(ProductService.getInstance());
    const productStore: ProductStore = useSelector((state: RootStore) => productSelector(state));
    const router = useRouter();
    const { id: productId } = router.query as unknown as { id: number };

    useEffect(() => {
        const selectedProduct = productStore.products.find((product: Product) => product.id === +productId);
        setProduct(selectedProduct);
    }, [productStore.products]);

    const getStarRating = (rating: number) => {
        rating = Math.round(rating);
        return (
            <div className="flex">
                {
                    Array(5).fill(1).map(() => rating--).map((number) => (
                        <svg key={number} fill="transparent" width="40" height="40" viewBox="0 0 24 24" className="star-svg">
                            <path fill={number > 0 ? 'orange' : 'grey'} stroke="none" strokeMiterlimit="10" strokeWidth="0"
                                  d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z"/>
                        </svg>
                    ))
                }
            </div>
        )
    }

    const submitReview = () => {
        if (!review || loading) {
            return;
        }
        setLoading(true);
        const serviceInstance = productServiceRef.current;
        const updatedProduct: Product = { ...product!, review };
        serviceInstance.updateProduct(productId, updatedProduct)
            .then(() => {
                setReview('');
                alert('Review submitted successfully');
            }).catch(() => {
                alert('Error occurred while submitting review');
            }).finally(() => {
                setLoading(false);
            });
    }

    return (
        <>
            <Header />
            <div className="product-container">
                <If condition={!product}>
                    <Then>
                        <p className="product-not-found-warning">Product not found!!!</p>
                    </Then>
                    <Else>
                        <div className="product-container__main">
                            <div className="product-details">
                                <span className="product-category">{product?.category}</span>
                                <span className="product-title">{product?.title}</span>
                                <span className="product-description">{product?.description}</span>
                                <div className="product-rating-section">
                                    <div className="stars">{getStarRating(product?.rating?.rate as number)}</div>
                                    <div className="stats">
                                        <span className="rate">{product?.rating?.rate}</span>
                                        ({product?.rating?.count})
                                    </div>
                                </div>
                                <span className="product-price">{product?.price}</span>
                                <div className="user-review-section">
                                    <textarea placeholder="Please submit your review" value={review} onChange={(event) => setReview(event.target.value)}/>
                                    <button disabled={!review || loading} onClick={submitReview} className="submit-btn">Submit</button>
                                </div>
                            </div>
                            <div className="product-image">
                                <img src={product?.image} alt=""/>
                            </div>
                        </div>
                    </Else>
                </If>
            </div>
        </>
    )
}
