import type { NextPage } from 'next'
import {ProductsContainer} from "../../src/containers/ProductsContainer";
import {ProductResolver} from "../../src/resolvers/product.resolver";

const ProductsIndex: NextPage = () => {
    return <ProductsContainer />
}

export default ProductResolver(ProductsIndex)
