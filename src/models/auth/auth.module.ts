import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JWT_CONSTANTS } from './constants';
import { UserModule } from 'src/models/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guard';
import { BcryptService } from 'src/common/public-decorator/services/bcrypt.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: JWT_CONSTANTS.secret,
      signOptions: { expiresIn: JWT_CONSTANTS.accessTokenLifeTime },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    BcryptService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
