import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Space, Space as SpaceModel } from '@prisma/client';
import { SpaceService } from 'src/models/space/space.service';

@Controller()
export class SpaceController {
  constructor(private spaceService: SpaceService) {}

  @Get('space/:id')
  async getSpaceById(@Param('id') id: string): Promise<SpaceModel> {
    return this.spaceService.space({ id: Number(id) });
  }

  @Get('spaces')
  async getSpaces(@Req() request: Request): Promise<Space[]> {
    return this.spaceService.spaces({
      where: { authorId: request['user']['userId'] },
    });
  }

  @Get('filtered-spaces/:searchString')
  async getFilteredSpaces(
    @Param('searchString') searchString: string,
  ): Promise<SpaceModel[]> {
    return this.spaceService.spaces({
      where: {
        title: { contains: searchString },
      },
    });
  }

  @Post('space')
  async createSpace(
    @Req() request: Request,
    @Body() spaceData: { title: string },
  ): Promise<SpaceModel> {
    const { title = 'autoTitle' } = spaceData;
    return this.spaceService.createSpace({
      title: title,
      author: { connect: { id: request['user']['userId'] } },
    });
  }
}
