import { Repository } from 'typeorm';
import { Product, Cart, User } from './entities';
export declare class AuthService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getUser(req: Request): Promise<User | null>;
}
export declare class DatabaseService {
    private productRepository;
    private cartRepository;
    private userRepository;
    constructor(productRepository: Repository<Product>, cartRepository: Repository<Cart>, userRepository: Repository<User>);
    checkIsAdmin(user: User): Promise<boolean>;
    getProducts(pageParam?: string, limit?: number): Promise<{
        data: Product[];
        nextCursor: string;
    } | {
        data: Product[];
        nextCursor?: undefined;
    }>;
    writeProductData(productData: Partial<Product>, imageUrl: string): Promise<Product>;
    addOrUpdateCart(product: Product, userId: number): Promise<Cart>;
    getCart(userId: number): Promise<Cart[]>;
    removeFromCart(userId: number, productId: number): Promise<void>;
}
