import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SpacesModule } from 'src/models/space/space.module';
import { UserModule } from 'src/models/user/user.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [SpacesModule, UserModule, ConfigModule.forRoot()],
  providers: [PrismaService],
})
export class AppModule {}
