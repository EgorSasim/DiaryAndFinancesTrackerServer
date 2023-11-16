import { Module } from '@nestjs/common';
import { SpacesController } from 'src/models/spaces/spaces.controller';
import { SpacesService } from 'src/models/spaces/spaces.service';

@Module({
  controllers: [SpacesController],
  providers: [SpacesService],
})
export class SpacesModule {}
