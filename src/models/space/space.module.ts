import { Module } from '@nestjs/common';
import { SpaceController } from 'src/models/space/space.controller';
import { SpaceService } from 'src/models/space/space.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SpaceController],
  providers: [SpaceService, PrismaService],
})
export class SpacesModule {}
