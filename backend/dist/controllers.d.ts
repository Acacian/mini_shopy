import { DatabaseService } from './services';
import { Product } from './entities';
import { AuthService } from './auth.service';
import { ExtendedRequest } from './dto/extended-request.dto';
export declare class DatabaseController {
    private databaseService;
    constructor(databaseService: DatabaseService);
    getProducts(page: string, limit: number): Promise<{
        data: Product[];
        nextCursor: string;
    } | {
        data: Product[];
        nextCursor?: undefined;
    }>;
    writeProductData(productData: any, imageUrl: string): Promise<Product>;
    addOrUpdateCart(product: Product, userId: number): Promise<import("./entities").Cart>;
    getCart(userId: number): Promise<import("./entities").Cart[]>;
    removeFromCart(userId: number, productId: number): Promise<void>;
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    getUser(req: ExtendedRequest): Promise<import("./entities").User | {
        error: any;
    }>;
}
