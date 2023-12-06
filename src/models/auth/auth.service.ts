import {
  ConflictException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/common/services/bcrypt.service';
import { JWT_CONSTANTS } from 'src/models/auth/constants';
import { UserService } from 'src/models/user/user.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
  private userToTokenMap: Map<
    number,
    { accessToken: string; refreshToken: string }
  > = new Map();

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
  ) {}

  public async logIn(email: string, password: string): Promise<any> {
    const user = await this.userService.user({
      email: email,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const arePasswordsMathed = await this.bcryptService.comparePasswords(
      password,
      user.password,
    );

    if (!arePasswordsMathed) {
      throw new UnauthorizedException();
    }

    this.userToTokenMap.set(user.id, this.generateTokens(user.id));
    return this.userToTokenMap.get(user.id);
  }

  public async singUp(
    email: string,
    password: string,
    name: string,
  ): Promise<any> {
    const isUserExists = await this.userService.user({ email });
    if (isUserExists) {
      throw new ConflictException();
    }

    const createdUser = await this.userService.createUser({
      email,
      password: await this.bcryptService.hashPassword(password),
      name,
    });

    this.userToTokenMap.set(
      createdUser.id,
      this.generateTokens(createdUser.id),
    );

    return this.userToTokenMap.get(createdUser.id);
  }

  public refreshToken(refreshToken: string): Promise<any> {
    try {
      this.jwtService.verify(refreshToken);
    } catch {
      throw new HttpException('Invalid Token', 498);
    }
    const userId = this.getUserIdByRefreshToken(refreshToken);

    if (userId !== 0 && !userId) {
      throw new HttpException('Invalid Token', 498);
    }
    const accessToken = this.generateAccessToken(userId);
    this.userToTokenMap.set(userId, { accessToken, refreshToken });
    return accessToken;
  }

  public getUserIdByAccessToken(accessToken: string) {
    return Array.from(this.userToTokenMap.entries()).find(
      (entry) => entry[1]?.accessToken === accessToken,
    )?.[0];
  }

  private generateTokens(userId) {
    return {
      accessToken: this.generateAccessToken(userId),
      refreshToken: this.generateRefreshToken(userId),
    };
  }

  private generateAccessToken(userId: number) {
    const payload = { userId };
    const options = { expiresIn: JWT_CONSTANTS.accessTokenLifeTime };

    return jwt.sign(payload, JWT_CONSTANTS.secret, options);
  }

  private generateRefreshToken(userId): string {
    const payload = { userId };
    const options = { expiresIn: JWT_CONSTANTS.refreshTokenLifeTime };

    return jwt.sign(payload, JWT_CONSTANTS.secret, options);
  }

  private getUserIdByRefreshToken(refreshToken: string): number {
    return Array.from(this.userToTokenMap.entries()).find(
      (entry) => entry[1]?.refreshToken === refreshToken,
    )?.[0];
  }
}
