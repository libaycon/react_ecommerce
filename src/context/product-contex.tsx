import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../types/product-types";

export interface ProductContextProps {
    products: Product[];
    categories: { id: number, name: string }[];
    currentCategory: {id: number | null, isUsed:boolean};
    setCurrentCategory: React.Dispatch<React.SetStateAction<{id: number | null, isUsed:boolean}>>;
    setCategories: React.Dispatch<React.SetStateAction<{ id: number, name: string }[]>>;
    productsFiltered: Product[];
    setPriceFilter: React.Dispatch<React.SetStateAction<{ min: number, max: number }>>;
    priceFilter: { min: number, max: number };
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const ProductContext = createContext({} as ProductContextProps);
export const useProduct = () => useContext(ProductContext);

export default function ProductProvider({ children }: { children: React.ReactNode }) {
    const [categories, setCategories] = useState<{ id: number, name: string }[]>([]);
    const [currentCategory, setCurrentCategory] = useState<{id: number | null, isUsed:boolean}>({id: null, isUsed: false});
    const [products, setProducts] = useState<Product[]>([]);
    const [productsFiltered, setProductsFiltered] = useState<Product[]>([]);
    const [priceFilter, setPriceFilter] = useState<{ min: number, max: number }>({ min: 0, max: 5000 });
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (priceFilter.min > 0 || priceFilter.max < 5000) {
            setProductsFiltered(products.filter(products => Number(products.price) >= priceFilter.min && Number(products.price) <= priceFilter.max));
        } else if (search) {
            const finded = products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()));
            setProductsFiltered(finded);
        } else {
            setProductsFiltered([]);
        }
        //console.log(productsFiltered.length + "<---- productos:" + products.length)
    },[priceFilter, search])

    useEffect(() => {
        if (currentCategory.id) {
            const options: { [key: string]: string } = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${currentCategory.id}`, options)
                .then(response => response.json())
                .then((data: Product[]) => setProducts(data))
        } else if (currentCategory.isUsed) {
            fetch('https://e-commerce-api-v2.academlo.tech/api/v1/products')
                .then(response => response.json())
                .then((data: Product[]) => setProducts(data));
        }
    }, [currentCategory])

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
            setPriceFilter,
            priceFilter,
            setCurrentCategory,
            currentCategory,
            search,
            setSearch
        }}>
            {children}
        </ProductContext.Provider>
    )
}