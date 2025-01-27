import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.enableCors({
    origin: [
      'http://localhost:4200', // Разрешен локальный фронтенд
      'https://frontend-djyauhen-djzhen1996s-projects.vercel.app', // Продакшн фронтенд
    ],
    methods: '*', // Разрешенные HTTP-методы
    allowedHeaders: '*', // Разрешенные заголовки
    credentials: true, // Поддержка cookies и токенов
    preflightContinue: false, // Сервер сам отвечает на preflight-запросы
    optionsSuccessStatus: 204, // HTTP-статус успешного ответа на preflight
  });

  await app.listen(3000);
}

bootstrap();
