import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './services';
import { DatabaseController } from './controllers';
import { Product, Cart, User } from './entities';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Product, Cart, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product, Cart, User]),
  ],
  controllers: [DatabaseController],
  providers: [DatabaseService],
})
export class AppModule {}
