import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { AuthService } from 'src/models/auth/auth.service';

@Injectable()
export class AccessTokenMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const [, accessToken] = req.headers['authorization'].split(' ');
    if (accessToken) {
      const userId = this.authService.getUserIdByAccessToken(accessToken);
      req['userId'] = userId;
    }
    next();
  }
}
