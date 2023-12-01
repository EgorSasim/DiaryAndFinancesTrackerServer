import { Module } from '@nestjs/common';
import { ListController } from 'src/models/list/list.controller';
import { ListService } from 'src/models/list/list.service';

@Module({
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}
