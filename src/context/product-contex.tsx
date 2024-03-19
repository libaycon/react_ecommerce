import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../types/product-types";

export interface ProductContextProps {
    products: Product[];
    categories: { id: number, name: string }[];
    setCategories: React.Dispatch<React.SetStateAction<{ id: number, name: string }[]>>;
    productsFiltered: Product[];
    setProductsFiltered: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductContext = createContext({} as ProductContextProps);
export const useProduct = () => useContext(ProductContext);

export default function ProductProvider({ children }: { children: React.ReactNode }) {
    const [categories, setCategories] = useState<{ id: number, name: string }[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [productsFiltered, setProductsFiltered] = useState<Product[]>([]);
    const [priceFilter, setPriceFilter] = useState<{ min: number, max: number }>({ min: 0, max: 10000 });

    useEffect(() => {
        setProductsFiltered(products.filter(products => products.price >= priceFilter.min && products.price <= priceFilter.max))
    })

    useEffect(() => {
        fetch('https://e-commerce-api-v2.academlo.tech/api/v1/products')
            .then(response => response.json())
            .then((data: Product[]) => setProducts(data));

        fetch('https://e-commerce-api-v2.academlo.tech/api/v1/categories')
            .then(response => response.json())
            .then((data: { id: number, name: string }[]) => setCategories(data))
    }, []);

    return (
        <ProductContext.Provider value={{
            products,
            categories,
            setCategories,
            productsFiltered,
            setProductsFiltered
        }}>
            {children}
        </ProductContext.Provider>
    )
}