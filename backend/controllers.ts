import { Controller, Get, Post, Delete, Param, Body, Query, Req } from '@nestjs/common';
import { DatabaseService, AuthService } from './services';
import { Product } from './entities';
import { Request } from '@nestjs/common';

@Controller('database')
export class DatabaseController {
  constructor(private databaseService: DatabaseService) {}

  @Get('products')
  getProducts(@Query('page') page: string, @Query('limit') limit: number) {
    return this.databaseService.getProducts(page, limit);
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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('user')
  getUser(@Req() req: Request) {
    return this.authService.getUser(req);
  }
}
