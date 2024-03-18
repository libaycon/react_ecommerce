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

interface Image {
    id: number;
    url: string
}

interface Category {
    id: number;
    name: string;
}