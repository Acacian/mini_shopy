export declare class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    option: string[];
    createdAt: number;
}
export declare class User {
    id: number;
    username: string;
    password: string;
    email: string;
    isAdmin: boolean;
    carts: Cart[];
}
export declare class Cart {
    id: number;
    user: User;
    product: Product;
    quantity: number;
}
