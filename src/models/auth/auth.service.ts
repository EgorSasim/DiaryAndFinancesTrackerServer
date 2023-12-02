import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/models/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async logIn(email: string, password: string): Promise<any> {
    console.log(`email: ${email}\npassword: ${password}`);

    const user = await this.userService.user({
      email: email,
    });

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email, password };

    return {
      access_token: await this.jwtService.signAsync(payload),
      id: user.id,
    };
  }

  async singUp(email: string, password: string, name: string): Promise<any> {
    const isUserExists = await this.userService.user({ email });
    console.log('is user exists: ', isUserExists);
    if (isUserExists) {
      throw new UnauthorizedException();
    }

    console.log('call sign up');
    console.log(`email: ${email}\npassword: ${password}\name: ${name}`);

    await this.userService.createUser({ email, password, name });
    const createdUser = await this.userService.user({ email });
    const payload = {
      sub: createdUser.id,
      username: createdUser.email,
      password,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      id: createdUser.id,
    };
  }
}
