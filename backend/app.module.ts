import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseController } from './controllers';
import { DatabaseService } from './services';
import { Product, Cart, User } from './entities';
import { AuthController } from './controllers'; // 추가: AuthController 가져오기
import { AuthService } from './auth.service'; // 추가: AuthService 가져오기

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Product, Cart, User],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Product, Cart, User]),
  ],
  controllers: [DatabaseController, AuthController], // 수정: AuthController 추가
  providers: [DatabaseService, AuthService], // 수정: AuthService 추가
})
export class AppModule {}
