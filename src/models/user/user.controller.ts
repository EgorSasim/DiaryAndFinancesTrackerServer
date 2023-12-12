import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from 'src/models/user/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user-name')
  async getUserName(@Req() request: Request) {
    const userName = (
      await this.userService.user({ id: request['user']['userId'] })
    ).name;
    return { userName };
  }
}
