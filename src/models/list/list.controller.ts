import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
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

  @Get('list/:id')
  async getListById(@Param('id') id: string): Promise<List> {
    return this.listService.list({ id: Number(id) });
  }

  @Post('list')
  async createList(
    @Body()
    listData: {
      title: string;
      spaceId: number;
    },
  ): Promise<List> {
    const { title, spaceId } = listData;

    return this.listService.createList({
      title: title,
      space: { connect: { id: spaceId } },
    });
  }

  @Put('list')
  async updateList(@Body() list: List): Promise<any> {
    return this.listService.updateList({
      where: { id: list.id, spaceId: list.spaceId },
      data: list,
    });
  }

  @Delete('list')
  async deleteList(
    @Body() data: { listId: number; spaceId: number },
  ): Promise<any> {
    const { listId, spaceId } = data;
    return this.listService.deleteList({
      space: { id: spaceId },
      id: listId,
    });
  }
}
