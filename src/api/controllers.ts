import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { DatabaseService } from './services';
import { Product } from './entities';

@Controller('database')
export class DatabaseController {
  constructor(private databaseService: DatabaseService) {}

  @Post('check-admin')
  checkIsAdmin(@Body('user') user: any) {
    return this.databaseService.checkIsAdmin(user);
  }

  @Get('products')
  getProducts(@Param('pageParam') pageParam: string, @Param('limit') limit: number) {
    return this.databaseService.getProducts(pageParam, limit);
  }

  @Post('products')
  writeProductData(@Body() productData: any, @Body('imageUrl') imageUrl: string) {
    return this.databaseService.writeProductData(productData, imageUrl);
  }

  @Post('cart')
  addOrUpdateCart(@Body() product: Product, @Body('userId') userId: number) {
    return this.databaseService.addOrUpdateCart(product, userId);
  }

  @Get('cart/:userId')
  getCart(@Param('userId') userId: number) {
    return this.databaseService.getCart(userId);
  }

  @Delete('cart/:userId/:productId')
  removeFromCart(@Param('userId') userId: number, @Param('productId') productId: number) {
    return this.databaseService.removeFromCart(userId, productId);
  }
}
