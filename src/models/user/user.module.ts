// import { Module } from '@nestjs/common';
// import { UserController } from 'src/models/user/user.controller';
// import { UserService } from 'src/models/user/user.service';
// import { PrismaService } from 'src/prisma.service';

// @Module({
//   controllers: [UserController],
//   providers: [UserService, PrismaService],
// })
// export class UserModule {}

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
