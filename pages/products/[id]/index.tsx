import type { NextPage } from 'next'
import {ProductResolver} from "../../../src/resolvers/product.resolver";
import {ProductContainer} from "../../../src/containers/ProductContainer";

const ProductIndex: NextPage = () => {
    return <ProductContainer />
}

export default ProductResolver(ProductIndex)
