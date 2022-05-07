import {useRouter} from "next/router";

export const Header = () => {
    const router = useRouter();

    const goToProductsPage = () => {
        router.push('/products');
    }

    return (
        <div className="p-4 bg-blue-500 text-white text-2xl font-semibold select-none">
            <span onClick={goToProductsPage} className="cursor-pointer">Products Store</span>
        </div>
    )
}
