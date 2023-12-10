import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/models/auth/auth.module';
import { ListModule } from 'src/models/list/list.module';
import { SpacesModule } from 'src/models/space/space.module';
import { UserModule } from 'src/models/user/user.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    SpacesModule,
    ListModule,
    UserModule,
    ConfigModule.forRoot(),
    AuthModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
