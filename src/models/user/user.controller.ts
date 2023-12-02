// import { Body, Controller, Post } from '@nestjs/common';
// import { User as UserModel } from '@prisma/client';
// import { UserService } from 'src/models/user/user.service';

// @Controller()
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   @Post('signUp')
//   public async signUpUser(
//     @Body() userData: { name: string; password: string; email: string },
//   ): Promise<UserModel> {
//     return this.userService.createUser(userData);
//   }

//   @Post('logIn')
//   public async logInUser(
//     @Body() userData: { password: string; email: string },
//   ): Promise<UserModel> {
//     return this.userService.createUser(userData);
//   }
// }
