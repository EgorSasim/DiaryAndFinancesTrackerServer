import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  async getSpaces(): Promise<Space[]> {
    return this.spaceService.spaces({});
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
    @Body() spaceData: { title: string; authorId: number },
  ): Promise<SpaceModel> {
    const { title, authorId } = spaceData;
    return this.spaceService.createSpace({
      title: title,
      author: { connect: { id: authorId } },
    });
  }
}
