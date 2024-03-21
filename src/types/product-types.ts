export interface Product {
    id: number;
    brand: string;
    title: string;
    description: string;
    price: string;
    createdAt: string;
    updatedAt: string;
    categoryId: number;
    images: Image[];
    category: Category;
}

export interface CartItem {
    id: number;
    product: Product;
    productId: number;
    quantity: number;
    userId: number;
}

interface Image {
    id: number;
    url: string
}

interface Category {
    id: number;
    name: string;
}