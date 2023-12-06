import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  public async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  public async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const arePasswordsMathed = await bcrypt.compare(password, hashedPassword);
    return arePasswordsMathed;
  }
}
