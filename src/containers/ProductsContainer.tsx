import {NextPage} from "next";
import {ProductFilter} from "../components/ProductFilter";
import {Header} from "../components/Header";
import {ProductsGrid} from "../components/ProductsGrid";

export const ProductsContainer: NextPage = () => {
    return (
        <>
            <Header />
            <ProductFilter />
            <ProductsGrid />
        </>
    )
}
