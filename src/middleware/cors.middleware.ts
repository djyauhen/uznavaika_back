import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', 'https://frontend-djyauhen-djzhen1996s-projects.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Custom-Header');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
      res.sendStatus(204);
    } else {
      next();
    }
  }
}
