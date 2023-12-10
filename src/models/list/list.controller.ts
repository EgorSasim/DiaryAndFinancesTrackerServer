import { Body, Controller, Post, Req } from '@nestjs/common';
import { List } from '@prisma/client';
import { ListService } from 'src/models/list/list.service';

@Controller()
export class ListController {
  constructor(private listService: ListService) {}

  @Post('list')
  async createList(@Req() request: Request, @Body() listData): Promise<List> {
    console.log('request: ', request);
    console.log('list data: ', listData);
    return;
  }
}
