import { Module } from '@nestjs/common';
import { ListController } from 'src/models/list/list.controller';
import { ListService } from 'src/models/list/list.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ListController],
  providers: [ListService, PrismaService],
})
export class ListModule {}
