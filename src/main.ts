import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { CorsMiddleware } from "./middleware/cors.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  // app.use(new CorsMiddleware().use);

  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'https://frontend-djyauhen-djzhen1996s-projects.vercel.app',
        'http://localhost:4200',
        'https://45.128.205.139',
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    // origin: 'https://frontend-djyauhen-djzhen1996s-projects.vercel.app', // Второй продакшн фронтен
    methods: 'GET,POST,PUT,DELETE,PATCH',
    allowedHeaders: 'Content-Type, Authorization, X-Custom-Header',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  await app.listen(3000);
}

bootstrap();
