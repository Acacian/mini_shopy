import { Controller, Get, Post, Delete, Param, Body, Query, Req, Request } from '@nestjs/common';
import { DatabaseService } from './services';
import { Product } from './entities';
import { AuthService } from './auth.service';

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
  async getUser(@Req() req: Request) {
    try {
      return await this.authService.getUser(req);
    } catch (error: any) {
      return { error: error.message };
    }
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    try {
      return await this.authService.login(body.username, body.password);
    } catch (error: any) {
      return { error: error.message };
    }
  }

  @Post('logout')
  async logout(@Req() req: Request) {
    try {
      return await this.authService.logout(req);
    } catch (error: any) {
      return { error: error.message };
    }
  }
}
