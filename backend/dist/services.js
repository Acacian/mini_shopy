"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("./entities");
let AuthService = class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getUser(req) {
        const userId = req.user.id;
        return this.userRepository.findOne(userId);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthService);
let DatabaseService = class DatabaseService {
    constructor(productRepository, cartRepository, userRepository) {
        this.productRepository = productRepository;
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
    }
    async checkIsAdmin(user) {
        const adminUser = await this.userRepository.findOne({ where: { id: user.id, isAdmin: true } });
        return !!adminUser;
    }
    async getProducts(pageParam = "", limit = 4) {
        const query = this.productRepository.createQueryBuilder('product')
            .orderBy('product.createdAt', 'DESC')
            .limit(limit);
        if (pageParam) {
            query.andWhere('product.createdAt < :pageParam', { pageParam: new Date(pageParam) });
        }
        const products = await query.getMany();
        if (products.length === limit) {
            return { data: products, nextCursor: products[limit - 1].createdAt.toString() };
        }
        else {
            return { data: products };
        }
    }
    async writeProductData(productData, imageUrl) {
        const product = this.productRepository.create(Object.assign(Object.assign({}, productData), { imageUrl, createdAt: Date.now() }));
        return this.productRepository.save(product);
    }
    async addOrUpdateCart(product, userId) {
        let cartItem = await this.cartRepository.findOne({ where: { product, user: { id: userId } } });
        if (cartItem) {
            cartItem.quantity += 1;
        }
        else {
            cartItem = this.cartRepository.create({ product, user: { id: userId }, quantity: 1 });
        }
        return this.cartRepository.save(cartItem);
    }
    async getCart(userId) {
        return this.cartRepository.find({ where: { user: { id: userId } }, relations: ['product'] });
    }
    async removeFromCart(userId, productId) {
        await this.cartRepository.delete({ user: { id: userId }, product: { id: productId } });
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Cart)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DatabaseService);
//# sourceMappingURL=services.js.map