import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { CorsMiddleware } from "./middleware/cors.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(new CorsMiddleware().use);

  // app.enableCors({
  //   origin: 'https://frontend-djyauhen-djzhen1996s-projects.vercel.app', // Второй продакшн фронтен
  //   methods: 'GET,POST,PUT,DELETE,PATCH',
  //   allowedHeaders: 'Content-Type, Authorization, X-Custom-Header',
  //   credentials: true,
  //   preflightContinue: false,
  //   optionsSuccessStatus: 204,
  // });

  await app.listen(3000);
}

bootstrap();
