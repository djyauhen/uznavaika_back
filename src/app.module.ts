import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { SubcategoriesModule } from './modules/subcategories/subcategories.module';
import { TeachersModule } from './modules/teachers/teachers.module';
import { OffersModule } from './modules/offers/offers.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { UsersModule } from './modules/users/users.module';
import { PhotosModule } from './modules/photos/photos.module';
import { AuthModule } from './modules/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_DB'), // Получаем URI из переменных окружения
        dbName: configService.get<string>('DB_NAME'), // Имя базы данных
      }),
      inject: [ConfigService], // Инжектим ConfigService
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Путь к папке public
      serveRoot: '/api', // Файлы доступны по корневому маршруту
    }),
    CategoriesModule,
    SubcategoriesModule,
    TeachersModule,
    OffersModule,
    DocumentsModule,
    UsersModule,
    PhotosModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
