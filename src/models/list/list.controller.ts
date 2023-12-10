import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { List } from '@prisma/client';
import { ListService } from 'src/models/list/list.service';

@Controller()
export class ListController {
  constructor(private listService: ListService) {}

  @Get('lists')
  async getLists(@Query() params: { spaceId: string }): Promise<List[]> {
    const spaceId: number = +params.spaceId;
    return this.listService.lists({ where: { spaceId } });
  }

  @Post('list')
  async createList(
    @Body()
    listData: {
      title: string;
      spaceId?: number;
      folderId?: number;
    },
  ): Promise<List> {
    const { title, spaceId, folderId } = listData;
    if (spaceId) {
      return this.listService.createList({
        title: title,
        space: { connect: { id: spaceId } },
      });
    }

    if (folderId) {
      return this.listService.createList({
        title: title,
        folder: { connect: { id: folderId } },
      });
    }
  }
}
