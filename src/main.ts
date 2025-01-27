import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:4200',
        'https://frontend-chi-lake.vercel.app',
        'https://frontend-djyauhen-djzhen1996s-projects.vercel.app',
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Разрешить запрос
      } else {
        callback(new Error('Not allowed by CORS')); // Заблокировать запрос
      }
    },
    methods: 'GET,POST,PUT,DELETE,PATCH',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  await app.listen(3000);
}

bootstrap();
