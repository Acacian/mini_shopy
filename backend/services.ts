import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, Cart, User } from './entities';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUser(req: Request) {
    const userId = req.user?.id;
    if (!userId) {
      throw new Error("User ID is undefined");
    }
    return this.userRepository.findOne({ where: { id: userId } });
  }
}

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async checkIsAdmin(user: User): Promise<boolean> {
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
    } else {
      return { data: products };
    }
  }

  async writeProductData(productData: Partial<Product>, imageUrl: string) {
    const product = this.productRepository.create({
      ...productData,
      imageUrl,
      createdAt: Date.now(),
    });
    return this.productRepository.save(product);
  }

  async addOrUpdateCart(product: Product, userId: number): Promise<Cart> {
    let cartItem = await this.cartRepository.findOne({ where: { product, user: { id: userId } } });
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cartItem = this.cartRepository.create({ product, user: { id: userId }, quantity: 1 });
    }
    return this.cartRepository.save(cartItem);
  }

  async getCart(userId: number): Promise<Cart[]> {
    return this.cartRepository.find({ where: { user: { id: userId } }, relations: ['product'] });
  }

  async removeFromCart(userId: number, productId: number): Promise<void> {
    await this.cartRepository.delete({ user: { id: userId }, product: { id: productId } } as any);
  }
}
