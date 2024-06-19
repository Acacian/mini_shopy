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
exports.AuthController = exports.DatabaseController = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("./services");
const entities_1 = require("./entities");
const auth_service_1 = require("./auth.service");
let DatabaseController = class DatabaseController {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    getProducts(page, limit) {
        return this.databaseService.getProducts(page, limit);
    }
    writeProductData(productData, imageUrl) {
        return this.databaseService.writeProductData(productData, imageUrl);
    }
    addOrUpdateCart(product, userId) {
        return this.databaseService.addOrUpdateCart(product, userId);
    }
    getCart(userId) {
        return this.databaseService.getCart(userId);
    }
    removeFromCart(userId, productId) {
        return this.databaseService.removeFromCart(userId, productId);
    }
};
exports.DatabaseController = DatabaseController;
__decorate([
    (0, common_1.Get)('products'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], DatabaseController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Post)('products'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Body)('imageUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], DatabaseController.prototype, "writeProductData", null);
__decorate([
    (0, common_1.Post)('cart'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.Product, Number]),
    __metadata("design:returntype", void 0)
], DatabaseController.prototype, "addOrUpdateCart", null);
__decorate([
    (0, common_1.Get)('cart/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DatabaseController.prototype, "getCart", null);
__decorate([
    (0, common_1.Delete)('cart/:userId/:productId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], DatabaseController.prototype, "removeFromCart", null);
exports.DatabaseController = DatabaseController = __decorate([
    (0, common_1.Controller)('database'),
    __metadata("design:paramtypes", [services_1.DatabaseService])
], DatabaseController);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async getUser(req) {
        try {
            return await this.authService.getUser(req);
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async login(body) {
        try {
            return await this.authService.login(body.username, body.password);
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async logout(req) {
        try {
            return await this.authService.logout(req);
        }
        catch (error) {
            return { error: error.message };
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=controllers.js.map